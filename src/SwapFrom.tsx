import {
  Button,
  Card,
  Text,
  Grid,
  Input,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "@nextui-org/react";
import { AppState, ActionType } from "./types/types";
import tokens from "./SampleTokens";
import { useToken, erc20ABI, useContractRead, useAccount } from "wagmi";
import { BigNumber, ethers, utils } from "ethers";

interface SwapFromProps {
  token: string;
}

function tokenToAddress(symbol: string) {
  let address;

  tokens.forEach((e) => {
    if (e.id === symbol) {
      address = e.address;
    }
  });

  return address;
}

export default function SwapFrom(props: SwapFromProps) {
  const targetToken = useSelector((state: AppState) => state.targetToken);

  const orders = useSelector((state: AppState) => state.orders);
  const ordersResults = useSelector((state: AppState) => state.ordersResults);
  useEffect(() => {
    estimateTrade();
    console.log("ordersResults: ", ordersResults);
  }, [orders]);

  function editOrderAmount(token: string, amountFrom: number) {
    return {
      type: ActionType.EDIT_ORDER_AMOUNT,
      payload: { token, amountFrom },
    };
  }

  function deleteOrder(tokenFrom: string) {
    return { type: ActionType.DELETE_ORDER, payload: { tokenFrom } };
  }

  function handleDeleteOrder() {
    dispatch(deleteOrder(props.token));
  }

  const dispatch = useDispatch();

  function handleAmountInput(event: any) {
    event.preventDefault();
    const amount = Number(event.target.value);
    dispatch(editOrderAmount(props.token, amount));
  }

  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    address: tokenToAddress(props.token),
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address ? address : "0x"],
    onSuccess() {
      console.log(data);
      if (data) {
        setBalance(utils.formatUnits(data, tokenData?.decimals));
      }
    },
    onError(e) {
      console.log(e);
    },
    onSettled() {
      console.log("settled");
    },
  });

  const {
    data: tokenData,
    isError: tokenIsError,
    isLoading: tokenIsLoading,
  } = useToken({
    address: tokenToAddress(props.token),
    onSuccess() {
      console.log(tokenData?.decimals);
    },
    onError(e) {
      console.log(e);
    },
    onSettled() {
      console.log("token settled");
    },
  });

  const {
    data: targetTokenData,
    isError: targetTokenIsError,
    isLoading: targetTokenIsLoading,
  } = useToken({
    address: targetToken === "ETH" ? undefined : tokenToAddress(targetToken),
    onSuccess() {
      console.log(tokenData?.decimals);
    },
    onError(e) {
      console.log(e);
    },
    onSettled() {
      console.log("token settled");
    },
  });

  const [balance, setBalance] = useState<BigNumber | string | undefined>("...");

  const [received, setReceived] = useState<BigNumber | string | undefined>(
    `... ${targetToken}`
  );

  async function estimateTrade() {
    console.log("estimate trade");
    setReceived(`... ${targetToken}`);
    const tokenFrom = props.token;
    const tokenTo = targetToken;
    const amountFrom = orders.find(
      (e) => e.tokenFrom === tokenFrom
    )?.amountFrom;
    console.log(orders);
    if (amountFrom) {
      const url = `https://api.0x.org/swap/v1/quote?buyToken=${
        targetToken === "ETH" ? "ETH" : targetToken
      }&sellToken=${tokenToAddress(
        tokenFrom
      )}&sellAmount=${ethers.utils.parseUnits(
        amountFrom.toString(),
        tokenData?.decimals
      )}`;
      console.log(url);

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const receivedFromTrade = utils.formatUnits(
        data.buyAmount,
        targetTokenData?.decimals
      );

      console.log(receivedFromTrade);

      dispatch({
        type: ActionType.ADD_ORDER_RESULT,
        payload: {
          tokenFrom,
          amountTo: receivedFromTrade,
        },
      });

      const roundedResult =
        Math.round(Number(receivedFromTrade) * 100000) / 100000;

      setReceived(roundedResult + ` ${targetToken}`);
    }
  }

  const amountFrom = useMemo(() => {
    return orders.find((e) => e.tokenFrom === props.token)?.amountFrom ?? "";
  }, [orders, props.token]);

  return (
    <Card
      css={{
        width: "90%",
        border: "1px solid",
        borderColor: "white",
        alignSelf: "center",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Grid.Container>
          <Grid xs={6} direction="column">
            <Text b>{`${props.token}`}</Text>
            <Text size={"$sm"}>{`Balance: ${balance}`}</Text>
          </Grid>
          <Grid xs={5}>
            <Input
              size="lg"
              bordered
              type="number"
              min={0}
              initialValue={''}
              placeholder="0.00"
              value={amountFrom}
              onChange={handleAmountInput}
            />
          </Grid>
          <Grid xs={1} justify="flex-end" alignItems="center">
            <Avatar
              squared
              bordered
              pointer
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              }
              size={"xs"}
              onClick={handleDeleteOrder}
            />
          </Grid>
        </Grid.Container>
      </Card.Body>
      <Card.Footer css={{marginTop: '-25px'}}>
        <Text b>{`+ ${received}`}</Text>
      </Card.Footer>
    </Card>
  );
}

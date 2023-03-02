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
import { useState } from "react";
import { useDispatch } from "react-redux";

enum ActionType {
  ADD_ORDER = "ADD_ORDER",
  EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
  SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
  DELETE_ORDER = "DELETE_ORDER",
}


interface SwapFromProps {
  token: string;
}

export default function SwapFrom(props: SwapFromProps) {
  const targetToken = useSelector((state: AppState) => state.targetToken);

  const orders = useSelector((state: AppState) => state.orders);

  function editOrderAmount(token: string, amount: number) {
    return { type: ActionType.EDIT_ORDER_AMOUNT, payload: { token, amount } };
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
    console.log(event.target.value);
    dispatch(editOrderAmount(props.token, event.target.value));
    console.log(orders);
  }


  return (
    <Card
      css={{
        alignItems: "center",
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
            <Text size={"$xs"}>Balance: ...</Text>
            <Badge isSquared color="success" variant="bordered">
              {`+ 0.34 ${targetToken}`}
            </Badge>
          </Grid>
          <Grid xs={5}>
            <Input
              size="lg"
              bordered
              labelRight={`${props.token}`}
              placeholder="0.00"
              animated={false}
              onInput={handleAmountInput}
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
    </Card>
  );
}

import {
  Button,
  Card,
  Text,
  Collapse,
  Switch,
  Input,
  Grid,
  Avatar,
  Checkbox,
} from "@nextui-org/react";
import SwapFrom from "./SwapFrom";
import SwapTo from "./SwapTo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddOrderModal from "./AddOrderModal";
import StartCardDisconnected from "./helpers/StartCardDisconnected";
import StartCardConnected from "./helpers/StartCardConnected";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { AppState, ActionType } from "./types/types";

export default function Widget() {
  const isCustomRecipientSelected = useSelector(
    (state: AppState) => state.isCustomRecipient
  );
  const orders = useSelector((state: AppState) => state.orders);
  const isModalOpen = useSelector((state: AppState) => state.openModal);
  const customRecipient = useSelector(
    (state: AppState) => state.customRecipient
  );
  const dispatch = useDispatch();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnecting, isDisconnected } = useAccount({
    onDisconnect() {
      handleDisconnect()
      console.log("Disconnected")
    }
  });

  function handleCustomRecipientCheckbox() {
    console.log(isCustomRecipientSelected);
    dispatch({
      type: ActionType.TOGGLE_CUSTOM_RECIPIENT,
      payload: !isCustomRecipientSelected,
    });
    console.log(isCustomRecipientSelected);
  }

  function handleModalOpen() {
    dispatch({ type: ActionType.OPEN_MODAL, payload: { openModal: true } });
    console.log(isModalOpen);
  }

  function handleCustomRecipientInput(event: any) {
    event.preventDefault();
    console.log(event.target.value);
    console.log("stuff");
    dispatch({
      type: ActionType.SET_CUSTOM_RECIPIENT,
      payload: event.target.value,
    });
    console.log(customRecipient);
  }

  function handleDisconnect() {
    dispatch({
      type: ActionType.CLEAR_ALL_ORDERS
    })
  }


  return (
    <>
      <AddOrderModal />
      <Card css={{ mw: "500px" }}>
        <Card.Header>
          <Text b>Swap</Text>
        </Card.Header>
        <Card.Divider />

        {orders.length != 0 ? (
          orders.map((order, key) => {
            return <SwapFrom key={key} token={order.tokenFrom} />;
          })
        ) : (
          isDisconnected ? (
            <StartCardDisconnected />
          ) : (
            <StartCardConnected />
          )
        )}

        <div style={{ alignSelf: "center" }}>
          <Avatar
            squared
            pointer
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            }
            size={"md"}
            onClick={isDisconnected ? openConnectModal : handleModalOpen}
          />
        </div>

        <SwapTo />

        <Card.Header>
          <Text b>Options</Text>
        </Card.Header>
        <Card.Divider />
        <Grid.Container gap={2} justify="center">
          <Grid
            css={{ border: "0px solid", borderColor: "white", display: "flex" }}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Checkbox size="sm" onChange={handleCustomRecipientCheckbox}>
              Custom recipient
            </Checkbox>
          </Grid>
          <Grid css={{ border: "0px solid", borderColor: "white" }}>
            <Input
              disabled={!isCustomRecipientSelected}
              size="sm"
              bordered
              placeholder="0x......"
              width={"300px"}
              onInput={(e) => handleCustomRecipientInput(e)}
            />
          </Grid>
        </Grid.Container>
        <Card.Divider />

        {isDisconnected ? (
          <Button onClick={openConnectModal} css={{ margin: "20px" }} size="xl">
            Connect Wallet
          </Button>
        ) : (
          <Button
            onClick={() => alert("Swap test")}
            css={{ margin: "20px" }}
            size="xl"
          >
            Swap
          </Button>
        )}
      </Card>
    </>
  );
}

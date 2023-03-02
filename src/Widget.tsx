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

export default function Widget() {

  enum ActionType {
    ADD_ORDER = "ADD_ORDER",
    EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
    SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
    DELETE_ORDER = "DELETE_ORDER",
    OPEN_MODAL = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL",
  }

  const [isCustomRecipient, setIsCustomRecipient] = useState(false);
  const [customRecipient, setCustomRecipient] = useState("");

  const orders = useSelector((state: AppState) => state.orders);
  const isModalOpen = useSelector((state: AppState) => state.openModal);
  const dispatch = useDispatch();
  function handleCustomRecipientCheckbox() {
    setIsCustomRecipient(!isCustomRecipient);
  }

  function handleCustomRecipientInput(event: any) {
    event.preventDefault();
    setCustomRecipient(event.target.value);
  }

  function handleModalOpen() {
    dispatch({ type: ActionType.OPEN_MODAL, payload: { openModal: true } });
    console.log(isModalOpen);
    
  }

  return (
    <>
      <AddOrderModal />
      <Card css={{ mw: "500px" }}>
        <Card.Header>
          <Text b>🦊 Kitsune Finance</Text>
        </Card.Header>
        <Card.Divider />

        {orders.map((order, key) => {
          return <SwapFrom key={key} token={order.tokenFrom} />;
        })}

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
            onClick={handleModalOpen}
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
            <Input size="sm" bordered placeholder="0x......" width={"300px"} />
          </Grid>
        </Grid.Container>
        <Card.Divider />

        <Button css={{ margin: "20px" }} size="xl" shadow>
          Swap!
        </Button>
      </Card>
    </>
  );
}

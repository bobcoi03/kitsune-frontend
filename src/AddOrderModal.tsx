import { Modal, Text, Input, Radio, Row, Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";

enum ActionType {
  ADD_ORDER = "ADD_ORDER",
  EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
  SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
  DELETE_ORDER = "DELETE_ORDER",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

export default function AddOrderModal() {
  const visible = useSelector((state: AppState) => state.openModal);
  const dispatch = useDispatch();
  const orders = useSelector((state: AppState) => state.orders);
  function closeHandler() {
    dispatch({ type: ActionType.CLOSE_MODAL, payload: { openModal: false } });
  }

  function addOrder(token: string) {
    return {type: ActionType.ADD_ORDER, payload: {tokenFrom: token, amount: 0}}
  }

  function handleAddOrder(token: string) {
    // check if in orders array, alert if so
    // if not, add to orders array
    // close modal

    if (orders.some((order) => order.tokenFrom === token)) {
      alert("Order already exists with this token");
      return;
    }
    dispatch(addOrder(token));
    closeHandler();
  }

  const [pickedToken, setPickedToken] = useState<string>("UNI");

  function tokenInOrders(token: string) {
    return orders.some((order) => order.tokenFrom === token);
  }

  const tokens = [
    "UNI",
    "MATIC",
    "DAI",
    "APE",
    "USDC",
  ]

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to{" "}
          <Text b size={18}>
            🦊KitsuneFinance
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text css={{ alignSelf: "center" }}>
          For testing purposes, the token choice is limited.
        </Text>
        <Text css={{ alignSelf: "center" }}>
          Select the token you'd like to swap.
        </Text>
        <Radio.Group label="Tokens" value={pickedToken} onChange={setPickedToken}>
          {tokens.map((token) => (
            <Radio key={token} value={token} isDisabled={tokenInOrders(token)}>
              {token}
            </Radio>
          ))}
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onClick={() => handleAddOrder(pickedToken)}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

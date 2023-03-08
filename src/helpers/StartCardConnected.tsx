import { Card, Grid, Badge, Input, Avatar, Text, Col } from "@nextui-org/react"
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useDispatch } from "react-redux";

enum ActionType {
  ADD_ORDER = "ADD_ORDER",
  EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
  SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
  DELETE_ORDER = "DELETE_ORDER",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SET_CUSTOM_RECIPIENT = "SET_CUSTOM_RECIPIENT",
  TOGGLE_CUSTOM_RECIPIENT = "TOGGLE_CUSTOM_RECIPIENT",
}


export default function StartCardConnected() {

  const dispatch = useDispatch();

  function handleModalOpen() {
    dispatch({ type: ActionType.OPEN_MODAL, payload: { openModal: true } });
  }

  const { openConnectModal } = useConnectModal();

    return (
        <Card
      css={{
        alignItems: "left",
        width: "90%",
        border: "1px solid",
        borderColor: "white",
        alignSelf: "center",
        marginTop: "10px",
        marginBottom: "10px",
      }}
      isPressable
      onPress={handleModalOpen}
    >
        <Card.Body>
            <Text h4>💱 Select your first token!</Text>
            <Text>Click here to start your trade!</Text>
        </Card.Body>
    </Card>
    )
}
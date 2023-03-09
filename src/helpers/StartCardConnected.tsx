import { Card, Grid, Badge, Input, Avatar, Text, Col } from "@nextui-org/react"
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useDispatch } from "react-redux";
import { ActionType } from "../types/types";

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
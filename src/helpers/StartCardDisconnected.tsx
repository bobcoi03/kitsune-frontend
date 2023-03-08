import { Card, Grid, Badge, Input, Avatar, Text, Col } from "@nextui-org/react"
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

export default function StartCardDisconnected() {


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
      onPress={openConnectModal}
    >
        <Card.Body>
            <Text h4>🦊 Welcome!</Text>
            <Text>Connect your wallet to get started.</Text>
        </Card.Body>
    </Card>
    )
}
import {
  Button,
  Card,
  Text,
  Collapse,
  Switch,
  Input,
  Grid,
  Avatar,
} from "@nextui-org/react";
import SwapFrom from "./SwapFrom";
import SwapTo from "./SwapTo";
import { useState } from "react";

export default function Widget() {


  return (
    <Card css={{ mw: "500px" }}>
      <Card.Header>
        <Text b>🦊 Kitsune Finance</Text>
      </Card.Header>
      <Card.Divider />

      <SwapFrom token={"DAI"} />
      <SwapFrom token={"MATIC"} />
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
        />
      </div>

      <SwapTo />

      <Card.Header>
        <Text b>Custom Recipient</Text>
      </Card.Header>
      <Card.Divider />
      <Grid.Container gap={2} justify="center">
        <Grid css={{ border: "0px solid", borderColor: "white" }}>
          <Switch size={"sm"}  />
        </Grid>
        <Grid css={{ border: "0px solid", borderColor: "white" }}>
          <Input size="sm" bordered placeholder="0x....." width={'300px'} />
        </Grid>
      </Grid.Container>
      <Card.Divider />

      <Button css={{ margin: "20px" }} size="xl" shadow>
        Swap!
      </Button>
    </Card>
  );
}

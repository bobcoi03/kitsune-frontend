import { Container, Row, Col, Grid } from "@nextui-org/react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import React from "react";
import Widget from "./Widget";
function App() {
  return (
    <>
      <Navbar shouldHideOnScroll variant="floating">
        <Navbar.Brand>
          <Text h3>🦊 KitsuneFinance</Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <ConnectButton />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Container
        md
        css={{ display: "flex", justifyContent: "center", marginTop: "7.5vh" }}
      >
        <Widget />
      </Container>
    </>
  );
}

export default App;

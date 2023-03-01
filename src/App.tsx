import { Container, Row, Col, Grid } from "@nextui-org/react";

import React from "react";
import Widget from "./Widget";
function App() {
  return (
    <Container md  css={{display: 'flex', justifyContent: 'center', marginTop: '15vh'}}>
      <Widget />
    </Container>
  );
}

export default App;

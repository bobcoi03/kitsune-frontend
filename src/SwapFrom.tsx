import { Button, Card, Text, Grid, Input, Avatar } from "@nextui-org/react";

interface SwapFromProps {
  token: string;
}

export default function SwapFrom(props: SwapFromProps) {
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
            <Text b>Swap From:</Text>
            <Text b>{`${props.token}`}</Text>
            <Text size={"$xs"}>Balance: 121.33</Text>
          </Grid>
          <Grid xs={5}>
            <Input
              size="lg"
              bordered
              labelRight={`${props.token}`}
              placeholder="0.00"
              animated={false}
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
            />
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}

import { useSelector } from 'react-redux';
import { Button, Card, Text, Grid, Input, Collapse } from "@nextui-org/react";

export default function SwapTo() {

    const targetToken = useSelector((state: AppState) => state.targetToken);

    return (
        
      <Card css={{ alignItems: "center", width: '90%', border: '1px solid', borderColor: 'white', alignSelf: 'center', marginTop: '10px', marginBottom: '10px'}}>
          <Card.Body>
            <Grid.Container>
              <Grid xs={6} direction='column'>
                <Text b>Swap To:</Text>
                <Text b>{`${targetToken}`}</Text>
                <Text size={"$xs"}>Balance: 0.87</Text>
              </Grid>
              <Grid xs={6} justify={'center'} alignContent={'center'} alignItems={'center'}>
                <Text size={'$2xl'}>{`+0.76 ${targetToken}`}</Text>
              </Grid>
            </Grid.Container>
            
          </Card.Body>
        </Card>
     
    )
} 
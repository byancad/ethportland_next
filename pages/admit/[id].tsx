import { Box, Button, Container, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { useAlertContext } from "contexts/alertContext";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const fakeEvent = { event: "Hackathon", artist: "Richard", date: "April 8, 2022", location: "Portland, Oregon", arrived: "1", capacity: "100"}

const Admit: NextPage = () => {
  const { popToast } = useAlertContext();

  const router = useRouter();
  const { id } = router.query;


  return (
  <div>
    <Container centerContent>
    <div style={{fontSize: "40px", marginTop: "10px"}}>Event Info</div>
    <Box bg="green" opacity="60%" w='100%' p={4} color='white' textAlign="center" marginTop="5">
      <div style={{fontSize: "70px"}}>{fakeEvent.artist}</div>
      <br/>
      <div style={{fontSize: "50px"}}>{fakeEvent.event}</div>
      <br/>
      <div style={{fontSize: "40px"}}>{fakeEvent.location}</div>
      <br/>
      <div style={{fontSize: "50px"}}>{fakeEvent.date}</div>    
      <br/>
      <div style={{fontSize: "20px"}}>{fakeEvent.arrived} / {fakeEvent.capacity} </div>    

      </Box>
      <Button onClick={()=>{popToast({title: "Admit One", status: "success"})} } width="100%" size="lg" height="70px" _focus={{ boxShadow: "none" }}
>ADMIT</Button>


    </Container>
    
    
  </div>
  );
};


export default Admit;

import { Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";



const Admit: NextPage = () => {

  const router = useRouter();
  const { address } = router.query;

  return (
  <div>
    <Container centerContent>
    <Heading>Event Details</Heading>
    </Container>
    
    {address}
  </div>
  );
};


export default Admit;

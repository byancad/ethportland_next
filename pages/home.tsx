import { Container } from "@chakra-ui/react";
import { NavBar } from "components/NavBar";
import type { NextPage } from "next";
import { Head } from "next/document";



const Home: NextPage = () => {
return (
    <div>
     <NavBar/>
    <Container centerContent>
        Home
    </Container>

  
  </div>
)
};


export default Home;

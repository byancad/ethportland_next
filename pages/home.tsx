import { Container } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { NavBar } from "components/NavBar";
import { TicketTable } from "components/Tables/TicketTable";
import type { NextPage } from "next";
import { Head } from "next/document";



const Home: NextPage = () => {
return (
    <div>
     <NavBar/>
    <Container centerContent>
        <SearchForm/>
        <TicketTable />
    </Container>

  
  </div>
)
};


export default Home;

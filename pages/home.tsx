import { Container } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { NavBar } from "components/NavBar";
import { TicketTable } from "components/Tables/TicketTable";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <Container centerContent>
        <SearchForm />
        <TicketTable />
      </Container>
    </>
  );
};

export default Home;

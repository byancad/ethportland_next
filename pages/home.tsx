import { Container } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { NavBar } from "components/NavBar";
import { TicketTable } from "components/Tables/TicketTable";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { getRandom, getStubAddress, createStub } =
    useSkaleStubFactoryContract();

  return (
    <>
      <NavBar />
      <Container centerContent>
        <SearchForm />
        <TicketTable />
        <button onClick={getRandom}>get random</button>
        <button onClick={() => getStubAddress(0)}>get address</button>
        <button onClick={() => createStub("test-name", "test-symbol")}>
          create stub
        </button>
      </Container>
    </>
  );
};

export default Home;

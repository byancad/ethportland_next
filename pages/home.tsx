import { Container } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { NavBar } from "components/NavBar";
import { TicketTable } from "components/Tables/TicketTable";
import { useContractContext } from "contexts/contractContext";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { state } = useContractContext();
  const { getStubAddress } = useSkaleStubFactoryContract();
  return (
    <>
      <NavBar />
      <Container centerContent>
        <SearchForm getStubAddress={getStubAddress} />
        <TicketTable tickets={Object.values(state)} />
      </Container>
    </>
  );
};

export default Home;

import { Container } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { NavBar } from "components/NavBar";
import { TicketTable } from "components/Tables/TicketTable";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { getRandom } = useSkaleStubFactoryContract();

  useEffect(() => {
    const getRando = async () => {
      console.log("getting randoooo");
      await getRandom();
    };

    getRando();
  });
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

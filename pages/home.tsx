import { Container } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { NavBar } from "components/NavBar";
import { TicketTable } from "components/Tables/TicketTable";
import { useContractContext } from "contexts/contractContext";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { state } = useContractContext();
  const { getStubAddress, stubCount, getRandom } =
    useSkaleStubFactoryContract();
  const [eventCount, setEventCount] = useState<number>(0);

  useEffect(() => {
    const updateStubCount = async () => {
      const res = await stubCount();
      setEventCount(res);
    };
    updateStubCount();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      let eventIds = [];
      for (let i = 0; i < eventCount; i++) {
        eventIds.push(i);
      }
      for (const id of eventIds) {
        await getStubAddress(id);
      }
    };
    getEvents();
  }, [eventCount]);

  return (
    <>
      <NavBar />
      <Container centerContent>
        <SearchForm getStubAddress={getStubAddress} />
        <TicketTable tickets={state} />
      </Container>
    </>
  );
};

export default Home;

import { Container, useDisclosure } from "@chakra-ui/react";
import { SearchForm } from "components/Forms/SearchForm";
import { TicketPurchaseModal } from "components/Modals/TicketPurchaseModal/TicketPurchaseModal";
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentEvent, setCurrentEvent] = useState<any>({});

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
        <TicketTable
          tickets={state.addressMap}
          onOpen={onOpen}
          setCurrentEvent={setCurrentEvent}
        />
        <TicketPurchaseModal
          isOpen={isOpen}
          onClose={onClose}
          event={currentEvent}
          getRandom={getRandom}
        />
      </Container>
    </>
  );
};

export default Home;

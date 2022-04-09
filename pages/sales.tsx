import { Container, Heading, useDisclosure } from "@chakra-ui/react";
import ListForm from "components/Forms/ListForm";
import { ListingTable } from "components/Tables/ListingTable";
import { useContractContext } from "contexts/contractContext";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import { NextPage } from "next";
import { useState } from "react";

const Sell: NextPage = () => {
  const { state } = useContractContext();
  const {
    getStubAddress,
    stubCount,
    getRandom
  } = useSkaleStubFactoryContract();
  const [eventCount, setEventCount] = useState<number>(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentEvent, setCurrentEvent] = useState<any>({});
  return (
    <div>
      <Container>
        <Heading>List Tickets</Heading>
        <ListForm />
        <ListingTable
          tickets={state}
          onOpen={onOpen}
          setCurrentEvent={setCurrentEvent}
        />
      </Container>
    </div>
  );
};

export default Sell;

import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
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
  const { onOpen } = useDisclosure();
  const [setCurrentEvent] = useState<any>({});
  const [showForm, setShowForm] = useState<boolean>();

  return (
    <div>
      <Container>
        <Heading>Resale Tickets</Heading>
        <Box textAlign={"right"}>
          <Button onClick={() => setShowForm(!showForm)}> Sell ticket</Button>
        </Box>

        {showForm && <ListForm />}
        <ListingTable
          tickets={state.addressMap}
          onOpen={onOpen}
          setCurrentEvent={setCurrentEvent}
        />
      </Container>
    </div>
  );
};

export default Sell;

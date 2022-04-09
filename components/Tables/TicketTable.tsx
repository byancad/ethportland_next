import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Contract } from "ethers";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import { useEffect, useState } from "react";

type TicketTableProps = {
  tickets: { [address: string]: Contract };
};

export const TicketTable = ({ tickets }: TicketTableProps) => {
  const [stubs, setStubs] = useState<any[]>([]);

  const addresses = Object.keys(tickets);

  useEffect(() => {
    const updateTicketDetails = async () => {
      let newTickets = [];
      for (const address of addresses) {
        const details = await tickets[address].details();
        const deets = {
          address,
          name: details["eventName"],
          artist: details["eventArtist"],
          date: details["eventDate"],
          location: details["eventLocation"],
          capacity: details["eventMaxMint"].toString(),
          creatorResellShare: details["eventCreatorResellShare"].toString(),
          usedCount: details["eventUsedCount"].toString(),
          mintedCount: details["eventMintedCount"].toString()
        };
        newTickets.push(deets);
      }

      setStubs([...newTickets]);
    };

    updateTicketDetails();
  }, [tickets]);

  const handleBuy = async (e: any): Promise<void> => {
    e.preventDefault();
  };

  return (
    <Table variant="simple" marginTop={18}>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Artist</Th>
          <Th>Location</Th>
          <Th>Available</Th>
          <Th>Purchase</Th>
        </Tr>
      </Thead>
      <Tbody>
        {stubs.map((stub: any, id: number) => {
          return (
            <Tr key={id}>
              <Td>{stub.date}</Td>
              <Td>{stub.artist}</Td>
              <Td>{stub.location}</Td>
              <Td>{stub.capacity}</Td>
              <Td>
                <Button onClick={handleBuy} _focus={{ boxShadow: "none" }}>
                  Buy One
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

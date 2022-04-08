import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";

export const TicketTable = () => {
  return (
    <Table variant="simple">
      <TableCaption>Mint Artist Tickets</TableCaption>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Location</Th>
          <Th>Eth Wallet Address</Th>
        </Tr>
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
};

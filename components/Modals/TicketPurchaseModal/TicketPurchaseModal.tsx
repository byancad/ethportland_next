import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import gradient from "random-gradient";

type TicketPurchaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: any;
};

export const TicketPurchaseModal = ({
  isOpen,
  onClose,
  event,
}: TicketPurchaseModalProps) => {
  const { name, location, date, mintedCount, capacity } = event;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          h={600}
          padding={"10px"}
          margin={"100px"}
          paddingLeft={"0px"}
          paddingRight={"0px"}
        >
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" p={4} color="white" mb={20} textAlign="center">
              <Heading>You're going to the show!</Heading>
              <Heading>Thanks for Buying on SkaleStub</Heading>
            </Box>
            <Box
              bg={gradient("poopy")}
              w="100%"
              h={200}
              p={4}
              pt={10}
              mt={38}
              color="white"
              textAlign="center"
            >
              <Text fontSize="2xl">{name}</Text>
              <Text fontSize="xl">{location}</Text>
              <Text fontSize="xl">{date}</Text>
              <Text fontSize="l">
                {parseInt(mintedCount) + 1} of {capacity}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

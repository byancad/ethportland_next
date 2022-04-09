import {
  Box,
  Button,
  Container,
  Heading,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useAlertContext } from "contexts/alertContext";
import { useContractContext } from "contexts/contractContext";
import { useUserContext } from "contexts/userContext";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import { useWagmi } from "hooks/useWagmi";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const fakeEvent = {
  event: "Hackathon",
  artist: "Richard",
  date: "April 8, 2022",
  location: "Portland, Oregon",
  arrived: "1",
  capacity: "100",
};

const Admit: NextPage = () => {
  const { address } = useUserContext();
  const { popToast } = useAlertContext();
  const { state } = useContractContext();
  const [eventDetails, setEventDetails] = useState<any>({});
  const { getStubAddress } = useSkaleStubFactoryContract();
  const { signer } = useWagmi();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const updateAddy = async (id: number) => {
      await getStubAddress(id);
    };
    if (address && signer && id && typeof id === "string") {
      updateAddy(parseInt(id));
    }
  }, [id, address, signer]);

  const contract =
    id && typeof id === "string" ? state.idMap[parseInt(id)] : null;

  useEffect(() => {
    const getDetails = async (contract: any) => {
      const details = await contract.details();
      const deets = {
        address: details["eventAddress"],
        name: details["eventName"],
        artist: details["eventArtist"],
        date: details["eventDate"],
        location: details["eventLocation"],
        capacity: details["eventMaxMint"].toString(),
        creatorResellShare: details["eventCreatorResellShare"].toString(),
        usedCount: details["eventUsedCount"].toString(),
        mintedCount: details["eventMintedCount"].toString(),
      };

      setEventDetails({ ...deets });
    };

    if (contract) getDetails(contract);
  }, [contract]);

  return (
    <div>
      <Container centerContent>
        <div style={{ fontSize: "40px", marginTop: "100px" }}>Event Info</div>
        <Box
          opacity="60%"
          w="100%"
          p={4}
          color="white"
          textAlign="center"
          marginTop="5"
        >
          <div style={{ fontSize: "70px" }}>{eventDetails?.artist}</div>
          <br />
          <div style={{ fontSize: "50px" }}>{eventDetails?.event}</div>
          <br />
          <div style={{ fontSize: "40px" }}>{eventDetails?.location}</div>
          <br />
          <div style={{ fontSize: "50px" }}>{eventDetails?.date}</div>
          <br />
          <div style={{ fontSize: "20px" }}>
            {eventDetails?.arrived} / {eventDetails?.capacity}{" "}
          </div>
        </Box>
        <Button
          onClick={() => {
            popToast({ title: "Admit One", status: "success" });
          }}
          mt={8}
          width="100%"
          size="lg"
          height="70px"
          _focus={{ boxShadow: "none" }}
        >
          ADMIT
        </Button>
      </Container>
    </div>
  );
};

export default Admit;

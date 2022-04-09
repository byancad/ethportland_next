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
import { useUserContext } from "contexts/userContext";
import { Contract, ethers } from "ethers";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import { useWagmi } from "hooks/useWagmi";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import address from "contracts/addresses";
import { skaleAddress } from "contracts/address.skale";
import { rinkebyFactoryAddress } from "contracts/addresses.rinkeby";
import harmonyAddress from "contracts/addresses.harmony";
import { useAlertContext } from "contexts/alertContext";
import StubListingAbi from "contracts/abis/StubListing";
import { ResellTable } from "components/Tables/ResellTable";

const CONTRACT_NAME = "SkaleStubFactory";
const addressesByChain: { [id: number]: string } = {
  69: address[CONTRACT_NAME],
  3092851097537429: skaleAddress,
  4: rinkebyFactoryAddress,
  1666700000: harmonyAddress
};

const Listings: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state } = useContractContext();
  const { getStubAddress } = useSkaleStubFactoryContract();
  const { signer, chainId } = useWagmi();
  const { address } = useUserContext();
  const { awaitTx, removeTx, popToast } = useAlertContext();
  const [eventDetails, setEventDetails] = useState<any>({});
  const [listings, setListings] = useState<any[]>([]);
  const [listingContracts, setListingContracts] = useState<Contract[]>([]);

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
        mintedCount: details["eventMintedCount"].toString()
      };

      setEventDetails({ ...deets });
    };

    const getListings = async (contract: any) => {
      const resales = await contract.getlistings();
      const filtered = resales.filter(
        (list: string) => list != "0x0000000000000000000000000000000000000000"
      );

      let newListings = filtered.map((address: string) => {
        return new ethers.Contract(address, StubListingAbi, signer);
      });
      setListingContracts([...newListings]);

      let listData = [];
      for (const l of newListings) {
        const details: any = await l.details();
        const deets = {
          price: details._askPrice.toString(),
          tokenId: details._tokenId.toString(),
          address: details._tokenAddress
        };
        listData.push(deets);
      }

      setListings([...listData]);
    };

    if (contract) getDetails(contract);
    if (contract) getListings(contract);
  }, [contract]);

  const handleBuyListing = async (address: string, id: string) => {
    console.log("buying listing");
  };

  const { onOpen } = useDisclosure();
  const [setCurrentEvent] = useState<any>({});
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleCreateListing = async (
    price: number,
    id: number,
    contract: Contract | null
  ) => {
    if (contract) {
      const factoryAddress = addressesByChain[chainId || 69];
      let tx;
      try {
        tx = await contract.listToken(id, price, factoryAddress);
        awaitTx(tx);
        await tx.wait(1);
        removeTx(tx);
        popToast({
          title: "You've listed your ticket for sell. Good luck!",
          status: "success"
        });
      } catch (e) {
        console.log(e);
        popToast({
          title: "Something went wrong!",
          status: "error"
        });

        removeTx(tx);
      }
    }
  };

  return (
    <div>
      <Container>
        <Heading>Resale Tickets</Heading>
        <Box textAlign={"right"}>
          <Button onClick={() => setShowForm(!showForm)}> Sell ticket</Button>
        </Box>

        <Box>{eventDetails?.name}</Box>
        <Box>{eventDetails?.artist}</Box>
        <Box>{eventDetails?.date}</Box>
        <Box>{eventDetails?.location}</Box>

        {showForm && (
          <ListForm
            handleCreate={handleCreateListing}
            contract={contract}
            setShowForm={setShowForm}
          />
        )}
        <ResellTable tickets={listings} handleClick={handleBuyListing} />
      </Container>
    </div>
  );
};

export default Listings;

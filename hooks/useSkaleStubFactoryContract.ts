import { useAlertContext } from "contexts/alertContext";
import { useSignerOrProvider } from "./useSignerOrProvider";
import address from "contracts/addresses";
import factoryAbi from "contracts/abis/SkaleStubFactory";
import stubAbi from "contracts/abis/SkaleStub";
import { useWagmi } from "./useWagmi";
import { rinkebyFactoryAddress } from "contracts/addresses.rinkeby";
import harmonyAddress from "contracts/addresses.harmony";
import { skaleAddress } from "contracts/address.skale";
import { DropInputProps } from "components/Forms/DropForm";
import { ethers } from "ethers";
import { useContractContext } from "contexts/contractContext";
import { redirect } from "next/dist/server/api-utils";
import router from "next/router";
const CONTRACT_NAME = "SkaleStubFactory";
// skale 3092851097537429
// rink 4
// harmony 1666700000
const addressesByChain: { [id: number]: string } = {
  69: address[CONTRACT_NAME],
  3092851097537429: skaleAddress,
  4: rinkebyFactoryAddress,
  1666700000: harmonyAddress
};

const chainNames: { [id: number]: string } = {
  69: "Local",
  3092851097537429: "Skale",
  4: "rinkeby",
  1666700000: "harmony"
};

export const useSkaleStubFactoryContract = () => {
  const { provider } = useSignerOrProvider();
  const { signer, chainId } = useWagmi();
  const { addContract, addContractById } = useContractContext();
  const { awaitTx, removeTx, popToast } = useAlertContext();

  // console.log(
  //   `${chainNames[chainId || 69]} contract address: `,
  //   addressesByChain[chainId || 69]
  // );

  const contract = new ethers.Contract(
    addressesByChain[chainId || 69],
    factoryAbi,
    signer || provider
  );

  const stubCount = async () => {
    try {
      const res = await contract.stubCount();

      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const getRandom = async () => {
    try {
      const res = await contract.getRandom();
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const getStubAddress = async (id: number) => {
    try {
      const res = await contract.getStubAddress(id);
      const stub = new ethers.Contract(res, stubAbi, signer || provider);

      if (res && stub && res !== "0x0000000000000000000000000000000000000000") {
        addContract(res, stub);
        addContractById(id, stub);
      } else {
        popToast({ title: "No tickets by that ID :( ", status: "error" });
      }

      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const createStub = async (params: DropInputProps) => {
    const {
      event,
      artist,
      date,
      location,
      qty,
      creatorResellShare,
      price
    } = params;
    let tx;
    try {
      tx = await contract.createStub(
        event,
        artist,
        date,
        location,
        qty,
        creatorResellShare,
        price
      );
      awaitTx(tx);
      await tx.wait(1);
      removeTx(tx);
      popToast({ title: "Drop successful!", status: "success" });
      router.push({
        pathname: "/home"
      });
    } catch (e) {
      removeTx(tx);
      console.error(e);
    }
  };

  const getListings = async () => {
    return await contract.getListings();
  };

  const addList = async (props: {
    price: number;
    address: string;
    id: number;
  }) => {
    const { price, address, id } = props;
    const stringId = address.toString() + "-" + id.toString();

    console.log(stringId);
  };

  return { getRandom, getStubAddress, createStub, stubCount, addList };
};

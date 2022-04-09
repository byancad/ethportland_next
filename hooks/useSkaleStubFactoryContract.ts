import { useAlertContext } from "contexts/alertContext";
import { useSignerOrProvider } from "./useSignerOrProvider";
import addresses from "contracts/addresses";
import factoryAbi from "contracts/abis/SkaleStubFactory";
import stubAbi from "contracts/abis/SkaleStub";
import { useWagmi } from "./useWagmi";
import { rinkebyFactoryAddress } from "contracts/addresses.rinkeby";
import { skaleAddress } from "contracts/address.skale";
import { DropInputProps } from "components/Forms/DropForm";
import { ethers } from "ethers";
import { useContractContext } from "contexts/contractContext";
const CONTRACT_NAME = "SkaleStubFactory";

export const useSkaleStubFactoryContract = () => {
  const { provider } = useSignerOrProvider();
  const { signer } = useWagmi();
  const { addContract } = useContractContext();
  const { awaitTx, removeTx, popToast } = useAlertContext();

  const contract = new ethers.Contract(
    skaleAddress,
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
      alert(res);
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
      } else {
        popToast({ title: "No tickets by that ID :( ", status: "error" });
      }

      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const createStub = async (params: DropInputProps) => {
    const { event, artist, date, location, qty, creatorResellShare } = params;
    let tx;
    try {
      tx = await contract.createStub(
        event,
        artist,
        date,
        location,
        qty,
        creatorResellShare
      );
      awaitTx(tx);
      await tx.wait(1);
      removeTx(tx);
      popToast({ title: "Drop successful!", status: "success" });
    } catch (e) {
      removeTx(tx);
      console.error(e);
    }
  };

  return { getRandom, getStubAddress, createStub, stubCount };
};

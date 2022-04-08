import { useAlertContext } from "contexts/alertContext";
import { useContract } from "wagmi";
import { useSignerOrProvider } from "./useSignerOrProvider";
import addresses from "contracts/addresses";
import abi from "contracts/abis/SkaleStubFactory";
import { useWagmi } from "./useWagmi";
const CONTRACT_NAME = "SkaleStubFactory";

export const useSkaleStubFactoryContract = () => {
  const { provider } = useSignerOrProvider();
  const { signer } = useWagmi();
  const { awaitTx, removeTx } = useAlertContext();

  const contract = useContract({
    addressOrName: addresses[CONTRACT_NAME],
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });

  const getRandom = async () => {
    try {
      return await contract.getRandom();
    } catch (e) {
      console.error(e);
    }
  };

  const getStubAddress = async (id: number) => {
    try {
      return await contract.getStubAddress(id);
    } catch (e) {
      console.error(e);
    }
  };

  const createStub = async (name: string, symbol: string) => {
    let tx;
    try {
      tx = await contract.createStub(name, symbol);
      awaitTx(tx);
      await tx.wait(1);
      removeTx(tx);
    } catch (e) {
      removeTx(tx);
      console.error(e);
    }
  };

  return { getRandom, getStubAddress, createStub };
};

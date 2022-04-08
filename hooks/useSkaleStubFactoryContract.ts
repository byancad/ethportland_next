import { useAlertContext } from "contexts/alertContext";
import { useContract } from "wagmi";
import { useSignerOrProvider } from "./useSignerOrProvider";
import addresses from "contracts/addresses";
import abi from "contracts/abis/SkaleStubFactory";
import { useWagmi } from "./useWagmi";
import { rinkebyFactoryAddress } from "contracts/addresses";
const CONTRACT_NAME = "SkaleStubFactory";

export const useSkaleStubFactoryContract = () => {
  const { provider } = useSignerOrProvider();
  const { signer } = useWagmi();
  const { awaitTx, removeTx } = useAlertContext();

  const contract = useContract({
    addressOrName: rinkebyFactoryAddress,
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });

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
      alert(res);
      return res;
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
      alert("Created stub");
    } catch (e) {
      removeTx(tx);
      console.error(e);
    }
  };

  return { getRandom, getStubAddress, createStub };
};

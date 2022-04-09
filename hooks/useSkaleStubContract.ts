import { useAlertContext } from "contexts/alertContext";
import { Contract } from "ethers";

export const useSkaleStubContract = () => {
  const getMintFunction = (contract: Contract) => {};
  const { awaitTx, removeTx, popToast } = useAlertContext();
  const mint = async (address: string, tokenURI: string) => {
    let tx;
    // try {
    //   tx = await contract.mint(address, tokenURI);
    //   awaitTx(tx);
    //   await tx.wait(1);
    //   removeTx(tx);
    //   popToast({ title: "Drop successful!", status: "success" });
    // } catch (e) {
    //   removeTx(tx);
    //   console.error(e);
    // }
  };
  return { mint };
};

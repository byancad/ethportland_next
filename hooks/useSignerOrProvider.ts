import { getDefaultProvider, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { useWagmi } from "./useWagmi";

type SignerOfProviderProps = {
  signer: Signer | undefined;
  provider: Provider;
};
export const useSignerOrProvider = (): SignerOfProviderProps => {
  const { signer } = useWagmi();
  signer ? console.log("signer exists") : console.log("signer does not exists");

  const provider = getDefaultProvider("rinkeby", {
    infura: {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    },
  });

  return { signer, provider };
};

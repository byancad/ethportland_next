import { useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork, useSigner } from "wagmi";

export const useWagmi = () => {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: disconnectData }, disconnect] = useAccount();
  const [{ data: signer }] = useSigner();

  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const chainId = data?.chain?.id;

  const [signerAddress, setSignerAddress] = useState<string | undefined>();

  useEffect(() => {
    const getSignerAddress = async () => {
      const address = await signer?.getAddress();
      setSignerAddress(address);
    };

    if (signer) getSignerAddress();
  }, [signer]);

  return {
    connectData,
    connect,
    disconnectData,
    disconnect,
    signer,
    signerAddress,
    chainId,
  };
};

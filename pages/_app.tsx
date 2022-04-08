import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { Provider } from "wagmi";
import { connectors } from "configs/wagmi";




const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Provider connectors={connectors} >
      <Component {...pageProps} /> 
      </Provider>
             
    </ChakraProvider>
  );
};

export default MyApp;
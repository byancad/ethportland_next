import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as UserProvider } from "contexts/userContext";
import { AlertProvider } from "contexts/alertContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { Provider } from "wagmi";
import { connectors } from "configs/wagmi";
import { UserSession } from "components/UserSession/UserSession";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <AlertProvider>
          <Provider connectors={connectors}>
            <UserSession>
              <Component {...pageProps} />
            </UserSession>
          </Provider>
        </AlertProvider>
      </UserProvider>
    </ChakraProvider>
  );
};

export default MyApp;

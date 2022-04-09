import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bgImage: "url('/home.jpg');"
      }
    }
  }
});

export default theme;

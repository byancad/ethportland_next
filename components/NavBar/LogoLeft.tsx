import { Box, Link } from "@chakra-ui/react";

export const LogoLeft = () => {
  return (
    <Box>
      <Link
        href="/home"
        style={{ textDecoration: "none", fontSize: "24px" }}
        _focus={{ boxShadow: "none" }}
      >
        SkaleStub
      </Link>
      {/* <img data-testid="kitty-image" src="" alt="kitty" /> */}
    </Box>
  );
};

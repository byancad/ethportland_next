import { Box, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { NavBar } from "../components/NavBar/index";
import DropForm from "components/Forms/DropForm";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";

type FormInputProps = {
  event: string;
  artist: string;
  date: string;
  location: string;
  qty: number;
};

const Drop: NextPage = () => {
  return (
    <>
      <NavBar />
      
      <Container>
        <Box  backgroundColor='#5662a6'
            opacity="90%"
            height="100%"
            borderRadius="4px"
            padding={9}
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            boxShadow='dark-lg'
            ml='2'>
 <DropForm />

        </Box>
       
      </Container>
    </>
  );
};

export default Drop;

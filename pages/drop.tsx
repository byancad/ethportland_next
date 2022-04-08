import { Container } from "@chakra-ui/react";
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
      <Container padding={20}>
        <DropForm />
      </Container>
    </>
  );
};

export default Drop;

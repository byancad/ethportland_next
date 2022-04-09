import {
  Heading,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import type { NextPage } from "next";
import { useState } from "react";

export type FormInputProps = {
  price: number;
  address: string;
  id: number;
};

const DropForm: NextPage = () => {
  const { addList } = useSkaleStubFactoryContract();
  const [formInput, setFormInput] = useState<FormInputProps>({
    price: 0,
    address: "",
    id: 0,
  });

  const handleChange = async (e: any): Promise<void> => {
    let value = e.target.value;
    if (e.target.name === "price" || e.target.name === "id") {
      value = parseInt(value);
    }
    setFormInput({
      ...formInput,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    await addList(formInput);
  };

  return (
    <>
      {/* <Heading alignContent="center">List Tickets</Heading> */}
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="event">ID</FormLabel>
          <Input onChange={handleChange} type="text" name="id" />

          <FormLabel htmlFor="address">Address</FormLabel>
          <Input onChange={handleChange} type="text" name="address" />
          <FormLabel htmlFor="amount">Price</FormLabel>
          <NumberInput>
            <NumberInputField
              type="text"
              placeholder="$"
              onChange={handleChange}
              name="price"
            />
          </NumberInput>
        </FormControl>
        <Button width="100%" mt={4} h={16} type="submit">
          List Ticket
        </Button>
      </form>
    </>
  );
};

export default DropForm;

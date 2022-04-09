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
  import type { NextPage } from "next";
  import { useState } from "react";
  
  export type FormInputProps = {
    price: number;
    address: string;
    id: string
  };
  
  const DropForm: NextPage = () => {

    const [formInput, setFormInput] = useState<FormInputProps>({
      price: 0,
      address: "",
      id: ""
    });
  
    const handleChange = async (e: any): Promise<void> => {
      e.target.value
     
    };
  
    const handleSubmit = async (e: any): Promise<void> => {
      e.preventDefault();
      
  
      console.log(formInput);
    };
  
    return (
      <>
        {/* <Heading alignContent="center">List Tickets</Heading> */}
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="event">ID</FormLabel>
            <Input onChange={handleChange} type="text" name="ID" />
      
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
  
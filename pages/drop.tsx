import { Heading, Button, Container, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useAlertContext } from "contexts/alertContext";
import type { NextPage } from "next";
import { useState } from "react";

type FormInputProps = {
  event: string;
  artist: string;
  date: string;
  location: string;
  qty: number;

}


const Drop: NextPage = () => {
  const { popToast } = useAlertContext();
  const [formInput, setFormInput] = useState<FormInputProps>({
    event: "",
    artist: "",
    date: "",
    location: "",
    qty: 0
  });

  const handleChange = async (e: any): Promise<void> => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name)
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    console.log('asdfas')
  
  };

  return (
    <Container padding={20}>
      <Heading alignContent="center">Drop Tickets</Heading>
      <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor='event-name'>Name of Event</FormLabel>
            <Input onChange={handleChange} type="text" name="event"  />
          <FormLabel htmlFor='artist-name'>Artist</FormLabel>
            <Input onChange={handleChange} type="text"  name="artist" />
          <FormLabel htmlFor='date'>Date</FormLabel>
            <Input onChange={handleChange} type="text" name="date" placeholder='Date' />
          <FormLabel htmlFor='location'>Location</FormLabel>
            <Input onChange={handleChange} type="text" name="location" />
         
          <FormLabel htmlFor='amount'>Amount</FormLabel>
            <NumberInput onChange={handleChange} name="qty">
              <NumberInputField type="qty" />
              
               
            </NumberInput>
      </FormControl>
      <Button type="submit">Create Event</Button>
      </form>
    </Container>
  );
};


export default Drop;

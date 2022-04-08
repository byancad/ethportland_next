import { Heading, Button, Container, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import type { NextPage } from "next";




const Drop: NextPage = () => {
  return (
    <Container padding={20}>
      <Heading alignContent="center">Drop Tickets</Heading>
      <form>
      <FormControl isRequired>
        <FormLabel htmlFor='event-name'>Name of Event</FormLabel>
            <Input id='event-name' placeholder='Name of Event' />
          <FormLabel htmlFor='artist-name'>Artist</FormLabel>
            <Input id='artist-name' placeholder='Name of Event' />
          <FormLabel htmlFor='date'>Date</FormLabel>
            <Input id='date' placeholder='Date' />
          <FormLabel htmlFor='location'>Location</FormLabel>
            <Input id='location' placeholder='Location' />
          <FormLabel htmlFor='time'>Time</FormLabel>
            <Input id='time' placeholder='Name of Event' />
          <FormLabel htmlFor='amount'>Amount</FormLabel>
            <NumberInput max={50} min={10}>
              <NumberInputField id='amount' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
      </FormControl>
      <Button type="submit">Create Event</Button>
      </form>
    </Container>
  );
};


export default Drop;

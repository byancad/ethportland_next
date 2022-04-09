import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useAlertContext } from "contexts/alertContext";
import { useSkaleStubFactoryContract } from "hooks/useSkaleStubFactoryContract";
import { useState } from "react";

type SearchFormProps = {
  getStubAddress: (id: number) => void;
};

export const SearchForm = ({ getStubAddress }: SearchFormProps) => {
  const [searchText, setSearchText] = useState<number>();

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (searchText) {
      await getStubAddress(searchText);
    }
  };

  const handleChange = async (e: any): Promise<void> => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl marginTop={16}>
          <FormHelperText textAlign="center" fontSize="50px">
            Search Tickets
          </FormHelperText>
          <FormLabel htmlFor="address"></FormLabel>
          <InputGroup width={550}>
            <Input onChange={handleChange} value={searchText} width="100%" />
            <InputRightElement width="4.5rem">
              <Button
                type="submit"
                h="1.75rem"
                size="sm"
                _focus={{ boxShadow: "none" }}
              >
                go
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </div>
  );
};

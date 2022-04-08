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
import { useState } from "react";

type SearchFormProps = {};

export const SearchForm = ({}: SearchFormProps) => {
  const { popToast } = useAlertContext();
  const [searchText, setSearchText] = useState<string>("");

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
  };

  const handleChange = async (e: any): Promise<void> => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormHelperText textAlign="center">Search Tickets</FormHelperText>
          <FormLabel htmlFor="address"></FormLabel>
          <InputGroup size="md">
            <Input onChange={handleChange} value={searchText} />
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

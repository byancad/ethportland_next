import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useClipboard
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useAlertContext } from "../../contexts/alertContext";
import { ellipsisString } from "../../utils";

type MenuContainerProps = {
  address: string;
  disconnect: () => void;
};

export const DropDownMenu = ({ address, disconnect }: MenuContainerProps) => {
  const { hasCopied, onCopy } = useClipboard(address);
  const { popToast } = useAlertContext();

  useEffect(() => {
    if (hasCopied) {
      popToast({ title: "Address Copied!" });
    }
  }, [hasCopied]);

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        aria-label="Options"
        icon={<Avatar name="RALLY" src="RLY_COIN.svg" />}
        outline="none"
      />

      <MenuList>
        <MenuItem onClick={onCopy}>{ellipsisString(address)}</MenuItem>
        <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
        <MenuItem>Dark Mode</MenuItem>
      </MenuList>
    </Menu>
  );
};

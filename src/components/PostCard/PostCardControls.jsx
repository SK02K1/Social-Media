import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import { BsThreeDotsVertical } from 'react-icons/bs';

export const PostCardControls = () => {
  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList fontSize='sm' minW={150}>
        <MenuItem>Edit</MenuItem>
        <MenuItem
          fontWeight='600'
          color={useColorModeValue('red.600', 'red.400')}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

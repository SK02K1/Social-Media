import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Text,
  HStack,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { handleLogout } from 'app/features';

export const UserProfileMenu = () => {
  const {
    user: { username, firstName, lastName },
  } = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch();
  const fullname = `${firstName} ${lastName}`;
  return (
    <Menu>
      <MenuButton
        size='md'
        w='full'
        as={Button}
        rightIcon={<ChevronDownIcon />}
        py={6}
        px={8}
      >
        <HStack>
          <Avatar colorScheme='blue' size='sm' name={fullname} />
          <Text>@{username}</Text>
        </HStack>
      </MenuButton>
      <MenuList p={0}>
        <MenuItem as={RouterLink} to={`/users/${username}`}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => dispatch(handleLogout())}
          _hover={{ bg: 'red.600', color: 'white' }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

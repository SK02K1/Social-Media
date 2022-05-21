import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Button,
  Box,
} from '@chakra-ui/react';

import { NavLink as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SidebarWrapper } from 'components';
import { handleLogout } from 'app/features';

const displayProp = {
  base: 'none',
  md: 'block',
};

const colStartProp = {
  md: 1,
};

const colEndProp = {
  md: 2,
};

const sidebarLinks = [
  {
    id: 1,
    navigateTo: '/',
    label: 'Home',
    iconName: 'home',
  },
  {
    id: 2,
    navigateTo: '/explore',
    label: 'Explore',
    iconName: 'explore',
  },
  {
    id: 3,
    navigateTo: '/bookmarks',
    label: 'Bookmarks',
    iconName: 'bookmarks',
  },
];

export const LeftSideBar = () => {
  const dispatch = useDispatch();
  const linksHoverBg = useColorModeValue('gray.200', 'gray.700');

  const sidebarLinksListing = sidebarLinks.map((linkData) => {
    const { id, navigateTo, label, iconName } = linkData;
    return (
      <HStack
        key={id}
        as={RouterLink}
        to={navigateTo}
        py={2}
        px={4}
        borderRadius='full'
        fontSize='xl'
        _hover={{ bg: linksHoverBg }}
        style={({ isActive }) => ({
          fontWeight: isActive ? '800' : '400',
        })}
      >
        <Box as='span' fontSize='3xl' className='material-symbols-rounded'>
          {iconName}
        </Box>
        <Text>{label}</Text>
      </HStack>
    );
  });

  return (
    <SidebarWrapper
      displayProp={displayProp}
      colStartProp={colStartProp}
      colEndProp={colEndProp}
    >
      <VStack
        height='80vh'
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <VStack spacing={6} alignItems='flex-start' marginLeft={-3}>
          {sidebarLinksListing}
        </VStack>
        <VStack spacing={6} alignItems='flex-start'>
          <Button
            onClick={() => dispatch(handleLogout())}
            w='full'
            bg='red.500'
            color='white'
            _hover={{ bg: 'red.400' }}
          >
            Logout
          </Button>
        </VStack>
      </VStack>
    </SidebarWrapper>
  );
};

import { NavLink as RouterLink } from 'react-router-dom';
import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Button,
  useColorMode,
} from '@chakra-ui/react';

import { SidebarWrapper, UserProfileMenu } from 'components';

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
    iconName: 'bookmark',
  },
];

export const LeftSideBar = () => {
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
        <span className='material-symbols-rounded'>{iconName}</span>
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
      <VStack spacing={100} alignItems='flex-start'>
        <VStack spacing={10} alignItems='flex-start'>
          <VStack spacing={6} alignItems='flex-start' marginLeft={-2.5}>
            {sidebarLinksListing}
          </VStack>
          <Button colorScheme='blue' size='lg' w='100%'>
            Create new post
          </Button>
          <UserProfileMenu />
        </VStack>
      </VStack>
    </SidebarWrapper>
  );
};

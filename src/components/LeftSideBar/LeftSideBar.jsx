import { NavLink as RouterLink } from 'react-router-dom';
import {
  Box,
  HStack,
  Link,
  Text,
  useColorModeValue,
  VStack,
  Button,
} from '@chakra-ui/react';
import { FiHome, FiBookmark } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
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
    icon: <FiHome />,
  },
  {
    id: 2,
    navigateTo: '/explore',
    label: 'Explore',
    icon: <MdOutlineExplore />,
  },
  {
    id: 3,
    navigateTo: '/bookmarks',
    label: 'Bookmarks',
    icon: <FiBookmark />,
  },
];

export const LeftSideBar = () => {
  const linksHoverBg = useColorModeValue('gray.200', 'gray.700');

  const sidebarLinksListing = sidebarLinks.map((linkData) => {
    const { id, navigateTo, label, icon } = linkData;
    return (
      <Link
        key={id}
        as={RouterLink}
        to={navigateTo}
        py={2}
        px={4}
        borderRadius='full'
        fontSize='xl'
        _hover={{ bg: linksHoverBg }}
        style={({ isActive }) => ({ fontWeight: isActive ? '700' : '400' })}
      >
        <HStack>
          <Box>{icon}</Box>
          <Text>{label}</Text>
        </HStack>
      </Link>
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

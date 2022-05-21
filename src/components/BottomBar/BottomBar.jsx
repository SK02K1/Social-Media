import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { handleLogout } from 'app/features';

const displayProp = {
  base: 'block',
  md: 'none',
};

const NavLinkWrapper = ({ to, children }) => {
  return (
    <Box
      style={({ isActive }) => ({ fontWeight: isActive ? '800' : '400' })}
      as={NavLink}
      to={to}
    >
      {children}
    </Box>
  );
};

export const BottomBar = () => {
  const dispatch = useDispatch();
  return (
    <Box
      display={displayProp}
      position='fixed'
      bottom={0}
      left={0}
      width='full'
      zIndex={200}
      px={2}
      py={4}
      bg={useColorModeValue('#F7FAFC', '#1A202C')}
    >
      <HStack justifyContent='space-evenly'>
        <NavLinkWrapper to='/'>
          <VStack>
            <Box as='span' fontSize='3xl' className='material-symbols-rounded'>
              home
            </Box>
            <Text fontSize='xs'>Home</Text>
          </VStack>
        </NavLinkWrapper>
        <NavLinkWrapper to='/bookmarks'>
          <VStack>
            <Box as='span' fontSize='3xl' className='material-symbols-rounded'>
              bookmarks
            </Box>
            <Text fontSize='xs'>Bookmarks</Text>
          </VStack>
        </NavLinkWrapper>
        <NavLinkWrapper to='explore'>
          <VStack>
            <Box as='span' fontSize='3xl' className='material-symbols-rounded'>
              explore
            </Box>
            <Text fontSize='xs'>Explore</Text>
          </VStack>
        </NavLinkWrapper>
        <VStack onClick={() => dispatch(handleLogout())}>
          <Box as='span' fontSize='3xl' className='material-symbols-rounded'>
            logout
          </Box>
          <Text fontSize='xs'>Logout</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

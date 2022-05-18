import {
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const { user } = useSelector((store) => store.auth.userData);

  const username = user?.username;
  const themeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const navbarBg = useColorModeValue(
    'rgb(247, 250, 252, 0.8)',
    'rgb(26, 32, 44, 0.8)'
  );

  return (
    <Container
      maxW='container.xl'
      position='fixed'
      top={0}
      left='50%'
      transform='translateX(-50%)'
      zIndex={200}
      py={4}
      bg={navbarBg}
    >
      <HStack as='nav' justifyContent='space-between' alignItems='center'>
        <Heading>LOGO</Heading>
        <HStack spacing={4}>
          {user && (
            <Tooltip label='View Profile'>
              <Button
                colorScheme='blue'
                variant='ghost'
                as={Link}
                to={`/users/${username}`}
              >
                @{username}
              </Button>
            </Tooltip>
          )}
          <IconButton
            onClick={toggleColorMode}
            variant='outline'
            size='md'
            icon={themeIcon}
          />
        </HStack>
      </HStack>
    </Container>
  );
};

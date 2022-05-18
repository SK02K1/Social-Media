import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

export const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
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
        <Image
          width='10rem'
          src={`/assets/logo-${colorMode}.svg`}
          alt='share moment logo'
        />

        <IconButton
          onClick={toggleColorMode}
          variant='outline'
          size='md'
          icon={themeIcon}
        />
      </HStack>
    </Container>
  );
};

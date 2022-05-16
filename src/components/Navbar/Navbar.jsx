import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  HStack,
  IconButton,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from 'logo.svg';

export const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const themeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);

  return (
    <HStack as='nav' justifyContent='space-between' alignItems='center' p={4}>
      <HStack cursor='pointer'>
        <Image
          boxSize='50px'
          objectFit='cover'
          src={Logo}
          alt='share moment logo'
        />
        <Text fontSize='xl' fontWeight='500'>
          sharemomet
        </Text>
      </HStack>
      <IconButton
        onClick={toggleColorMode}
        variant='outline'
        size='md'
        icon={themeIcon}
      />
    </HStack>
  );
};

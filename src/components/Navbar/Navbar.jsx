import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  HStack,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

export const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const themeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);

  return (
    <HStack as='nav' justifyContent='space-between' alignItems='center' p={4}>
      <HStack cursor='pointer'>
        <Image
          width='10rem'
          src={`/assets/logo-${colorMode}.svg`}
          alt='share moment logo'
        />
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

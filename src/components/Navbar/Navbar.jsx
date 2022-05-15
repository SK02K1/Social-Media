import { MoonIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Image, Text } from '@chakra-ui/react';
import Logo from '../../logo.svg';

export const Navbar = () => {
  return (
    <HStack as='nav' justifyContent='space-between' p={4}>
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
      <IconButton variant='ghost' size='md' icon={<MoonIcon />} />
    </HStack>
  );
};

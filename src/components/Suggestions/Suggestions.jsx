import { Box, useColorModeValue } from '@chakra-ui/react';

export const Suggestions = () => {
  return (
    <Box
      minH='20rem'
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='lg'
      boxShadow='xl'
    ></Box>
  );
};

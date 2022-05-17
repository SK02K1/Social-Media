import { Box, Heading } from '@chakra-ui/react';

const displayProp = {
  base: 'block',
  md: 'none',
};

export const BottomBar = () => {
  return (
    <Box
      display={displayProp}
      position='fixed'
      bottom={0}
      left={0}
      width='full'
      bg='purple.600'
      zIndex={200}
    >
      <Heading textAlign='center'>Bottom Bar</Heading>
    </Box>
  );
};

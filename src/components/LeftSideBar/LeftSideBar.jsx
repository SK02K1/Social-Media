import { GridItem, Heading } from '@chakra-ui/react';

const displayProp = {
  base: 'none',
  md: 'block',
};

const colStartProp = {
  md: 1,
};

const colEndProp = {
  md: 4,
  lg: 3,
};

export const LeftSideBar = () => {
  return (
    <GridItem
      // bg='red.600'
      colStart={colStartProp}
      colEnd={colEndProp}
      display={displayProp}
      position='sticky'
      top={0}
      height='100vh'
      boxSizing='border-box'
      pt={20}
    >
      <Heading textAlign='center'>Left Side bar</Heading>
    </GridItem>
  );
};

import { GridItem, Heading } from '@chakra-ui/react';

const displayProp = {
  base: 'none',
  lg: 'block',
};

const colStartProp = {
  lg: 6,
};

const colEndProp = {
  lg: 8,
};

export const RightSideBar = () => {
  return (
    <GridItem
      // bg='blue.600'
      colStart={colStartProp}
      colEnd={colEndProp}
      display={displayProp}
      position='sticky'
      top={0}
      height='100vh'
      boxSizing='border-box'
      pt={20}
    >
      <Heading textAlign='center'>Right Side Bar</Heading>
    </GridItem>
  );
};

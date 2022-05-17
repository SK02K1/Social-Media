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
      bg='red.600'
      colStart={colStartProp}
      colEnd={colEndProp}
      display={displayProp}
    >
      <Heading textAlign='center'>Left Side bar</Heading>
    </GridItem>
  );
};

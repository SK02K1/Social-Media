import { GridItem } from '@chakra-ui/react';

const colStartProp = {
  base: 1,
  md: 4,
  lg: 3,
};

const colEndProp = {
  base: 8,
  lg: 6,
};

export const ContentWrapper = ({ children }) => {
  return (
    <GridItem
      colStart={colStartProp}
      colEnd={colEndProp}
      // bg='green.600'
      pt={20}
    >
      {children}
    </GridItem>
  );
};

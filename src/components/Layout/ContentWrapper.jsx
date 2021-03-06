import { GridItem } from '@chakra-ui/react';

const colStartProp = {
  base: 1,
  md: 2,
};

const colEndProp = {
  base: 8,
  lg: 6,
};

export const ContentWrapper = ({ children }) => {
  return (
    <GridItem colStart={colStartProp} colEnd={colEndProp} py={20}>
      {children}
    </GridItem>
  );
};

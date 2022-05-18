import { GridItem } from '@chakra-ui/react';

export const SidebarWrapper = ({
  colStartProp,
  colEndProp,
  displayProp,
  children,
}) => {
  return (
    <GridItem
      colStart={colStartProp}
      colEnd={colEndProp}
      display={displayProp}
      position='sticky'
      top={0}
      height='100vh'
      boxSizing='border-box'
      pt={20}
    >
      {children}
    </GridItem>
  );
};

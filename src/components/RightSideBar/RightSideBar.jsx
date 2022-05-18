import { Heading } from '@chakra-ui/react';
import { SidebarWrapper } from 'components';

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
    <SidebarWrapper
      displayProp={displayProp}
      colStartProp={colStartProp}
      colEndProp={colEndProp}
    >
      <Heading textAlign='center'>Right Side Bar</Heading>
    </SidebarWrapper>
  );
};

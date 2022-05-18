import { Heading } from '@chakra-ui/react';
import { SidebarWrapper } from 'components';

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
    <SidebarWrapper
      displayProp={displayProp}
      colStartProp={colStartProp}
      colEndProp={colEndProp}
    >
      <Heading textAlign='center'>Left Side bar</Heading>
    </SidebarWrapper>
  );
};

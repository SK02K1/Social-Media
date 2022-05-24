import { Input, VStack } from '@chakra-ui/react';
import { SidebarWrapper, Suggestions } from 'components';

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
      <VStack w='full' spacing={4} alignItems='left'>
        <Input placeholder='Search Posts, People, anything' />
        <Suggestions />
      </VStack>
    </SidebarWrapper>
  );
};

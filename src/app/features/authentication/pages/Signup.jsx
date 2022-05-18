import { Flex } from '@chakra-ui/react';
import { SignupForm } from 'components';

export const Signup = () => {
  return (
    <Flex pt={20} justifyContent='center' alignItems='center'>
      <SignupForm />
    </Flex>
  );
};

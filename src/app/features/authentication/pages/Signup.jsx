import { Flex } from '@chakra-ui/react';
import { SignupForm } from '../../../../components';

export const Signup = () => {
  return (
    <Flex height='90vh' justifyContent='center' alignItems='center'>
      <SignupForm />
    </Flex>
  );
};

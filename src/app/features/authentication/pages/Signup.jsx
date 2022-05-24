import { Flex } from '@chakra-ui/react';
import { SignupForm } from 'components';
import { useDocumentTitle } from 'hooks';

export const Signup = () => {
  useDocumentTitle('Signup');
  return (
    <Flex pt={20} justifyContent='center' alignItems='center'>
      <SignupForm />
    </Flex>
  );
};

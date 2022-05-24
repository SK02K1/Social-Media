import { Flex } from '@chakra-ui/react';
import { LoginForm } from 'components';
import { useDocumentTitle } from 'hooks';

export const Login = () => {
  useDocumentTitle('Login');
  return (
    <Flex pt={20} justifyContent='center' alignItems='center'>
      <LoginForm />
    </Flex>
  );
};

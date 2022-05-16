import {
  Box,
  Heading,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const loginFormFields = [
  {
    id: 1,
    type: 'text',
    name: 'username',
    label: 'Username',
  },
  {
    id: 2,
    type: 'password',
    name: 'password',
    label: 'Password',
  },
];

export const LoginForm = () => {
  const formBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const fieldsListing = loginFormFields.map(({ id, type, name, label }) => {
    return (
      <VStack key={id} alignItems='flex-start' spacing={1}>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          name={name}
          id={name}
          placeholder={`Enter your ${name}`}
        />
      </VStack>
    );
  });

  return (
    <Box
      as='form'
      boxShadow='base'
      w={['90%', '70%', '60%', '40%', '30%']}
      borderRadius='xl'
      p={8}
      bg={formBg}
    >
      <Heading as='h1' size='lg' textAlign='center' mb='4'>
        Login
      </Heading>
      <FormControl isRequired>
        <VStack width='full' alignItems='left' spacing={4}>
          {fieldsListing}
          <Button size='md' w='full' colorScheme='blue' type='submit'>
            Login
          </Button>
          <Button variant='outline' size='md' w='full' colorScheme='blue'>
            Use test credentials
          </Button>
        </VStack>
      </FormControl>
      <VStack>
        <Link
          display='inline-block'
          textAlign='center'
          p={1.5}
          m={4}
          as={RouterLink}
          to='/signup'
        >
          Don't have an account? Create one new
        </Link>
      </VStack>
    </Box>
  );
};

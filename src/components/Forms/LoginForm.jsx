import {
  Box,
  Heading,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

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
      borderRadius='base'
      p={8}
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
    </Box>
  );
};

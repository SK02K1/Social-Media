import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

export const LoginForm = () => {
  const formBg = useColorModeValue('white', 'gray.700');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      as='form'
      boxShadow='lg'
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
          <VStack alignItems='flex-start' spacing={1}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              name='username'
              id='username'
              placeholder='Enter your username'
            />
          </VStack>
          <VStack alignItems='flex-start' spacing={1}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='Enter your password'
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
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
          Don't have an account? Create one now
        </Link>
      </VStack>
    </Box>
  );
};

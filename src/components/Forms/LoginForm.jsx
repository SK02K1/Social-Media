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
import { testCredentials, inputChangeHandler } from '../../utilities';

export const LoginForm = () => {
  const formBg = useColorModeValue('white', 'gray.700');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const fieldChangeHandler = (e) => {
    setFormData(inputChangeHandler({ formData, e }));
  };

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
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              onChange={fieldChangeHandler}
              type='text'
              name='username'
              id='username'
              value={username}
              placeholder='Enter your username'
            />
          </VStack>
          <VStack alignItems='flex-start' spacing={1}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup>
              <Input
                onChange={fieldChangeHandler}
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                value={password}
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
          <Button
            onClick={() => setFormData(testCredentials)}
            variant='outline'
            size='md'
            w='full'
            colorScheme='blue'
          >
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

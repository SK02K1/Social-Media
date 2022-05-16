import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
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
  Spinner,
  FormErrorMessage,
} from '@chakra-ui/react';
import { testCredentials, inputChangeHandler } from '../../utilities';
import { handleLogin } from '../../app/features';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthErrorReset } from '../../hooks';

export const LoginForm = () => {
  useAuthErrorReset();
  const dispatch = useDispatch();
  const location = useLocation();
  const formBg = useColorModeValue('white', 'gray.700');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const { userData, status, error } = useSelector((store) => store.auth);
  const from = location?.state?.from?.pathname || '/';

  const fieldChangeHandler = (e) => {
    setFormData(inputChangeHandler({ formData, e }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(handleLogin(formData));
  };

  return (
    <>
      {userData?.user && <Navigate to={from} replace />}
      <Box
        onSubmit={submitHandler}
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

        <FormControl isRequired isInvalid={error}>
          {error && (
            <VStack>
              <FormErrorMessage fontWeight={600} py={2} textAlign='center'>
                {error}
              </FormErrorMessage>
            </VStack>
          )}
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
            <Button
              size='md'
              w='full'
              colorScheme='blue'
              type='submit'
              disabled={status === 'pending'}
            >
              {status === 'pending' ? <Spinner size='sm' /> : 'Login'}
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
    </>
  );
};

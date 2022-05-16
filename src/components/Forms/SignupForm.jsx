import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  useColorModeValue,
  Link,
  VStack,
  Spinner,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useLocation, Navigate } from 'react-router-dom';
import { inputChangeHandler } from 'utilities';
import { handleSignup } from 'app/features';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthErrorReset } from 'hooks';

export const SignupForm = () => {
  useAuthErrorReset();
  const dispatch = useDispatch();
  const location = useLocation();
  const formBg = useColorModeValue('white', 'gray.700');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, username, password, confirmPassword } = formData;

  const { userData, status, error } = useSelector((store) => store.auth);

  const from = location?.state?.from?.pathname || '/';

  const arePasswordsSame =
    Boolean(password) &&
    Boolean(confirmPassword) &&
    confirmPassword === password;

  const fieldChangeHandler = (e) => {
    setFormData((formData) => inputChangeHandler({ e, formData }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(handleSignup(formData));
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
          Signup
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel htmlFor='firstname'>First Name</FormLabel>
              <Input
                onChange={fieldChangeHandler}
                type='text'
                id='firstname'
                name='firstName'
                value={firstName}
                placeholder='Tanay'
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel htmlFor='lastname'>Last Name</FormLabel>
              <Input
                onChange={fieldChangeHandler}
                type='text'
                name='lastName'
                id='lastname'
                value={lastName}
                placeholder='Pratap'
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isRequired isInvalid={error}>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                onChange={fieldChangeHandler}
                type='text'
                name='username'
                id='username'
                value={username}
                placeholder='thechachachoudharyji'
              />
              {error && (
                <FormErrorMessage fontWeight={600} py={2} textAlign='center'>
                  {error}
                </FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                onChange={fieldChangeHandler}
                type='text'
                name='password'
                id='password'
                value={password}
                placeholder='Enter your password'
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
              <Input
                onChange={fieldChangeHandler}
                type='text'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                placeholder='Re-enter your password'
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              type='submit'
              w='full'
              colorScheme='blue'
              disabled={!arePasswordsSame || status === 'pending'}
            >
              {status === 'pending' ? (
                <Spinner size='sm' />
              ) : (
                'Create new account'
              )}
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <VStack>
              <Link
                display='inline-block'
                textAlign='center'
                as={RouterLink}
                to='/login'
              >
                Already have an account? Sign in
              </Link>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

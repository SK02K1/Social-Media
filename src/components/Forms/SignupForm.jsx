import { Link as RouterLink } from 'react-router-dom';
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
} from '@chakra-ui/react';

export const SignupForm = () => {
  const formBg = useColorModeValue('white', 'gray.700');
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
        Signup
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel htmlFor='firstname'>First Name</FormLabel>
            <Input
              type='text'
              id='firstname'
              name='firstname'
              placeholder='Tanay'
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel htmlFor='lastname'>Last Name</FormLabel>
            <Input
              type='text'
              name='lastname'
              id='lastname'
              placeholder='Pratap'
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              type='text'
              name='username'
              id='username'
              placeholder='thechachachoudharyji'
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              type='text'
              name='password'
              id='password'
              placeholder='Enter your password'
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
            <Input
              type='text'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Re-enter your password'
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Button type='submit' w='full' colorScheme='blue'>
            Create new account
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
  );
};

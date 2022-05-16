import { Heading, Box, VStack, Button, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../../authentication/authSlice';

export const Posts = () => {
  const { user } = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch();
  const { firstName, lastName } = user;
  return (
    <Box>
      <VStack spacing={8}>
        <Heading textAlign='center' m={4}>
          Posts
        </Heading>
        <Text fontSize={24} textAlign='center'>
          👋🏻 Hellew{' '}
          <Text as='span' fontWeight={600}>
            {firstName} {lastName}
          </Text>
        </Text>
        <Button
          onClick={() => dispatch(handleLogout())}
          bg='red.500'
          color='white'
          _hover={{ bg: 'red.400' }}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

import { ProfileCard } from 'components';
import { useAxios } from 'hooks';
import { useParams } from 'react-router-dom';

export const SingleUser = () => {
  const { username } = useParams();
  const { data, status, error } = useAxios(`/api/users/${username}`);
  const userData = data?.user;

  return (
    <Box>
      {userData && <ProfileCard userData={userData} />}
      {status === 'pending' && (
        <VStack w='full' my={8}>
          <Spinner speed='0.2s' size='sm' />
        </VStack>
      )}
      {error && (
        <Text textAlign='center' my={4} color='red.500' fontSize='xl'>
          {error}
        </Text>
      )}
    </Box>
  );
};

import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

import { ProfileCard } from 'components';
import { useAxios } from 'hooks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PostsListing } from './PostsListing';

export const SingleUser = () => {
  const { user } = useSelector((store) => store.auth.userData);
  const { username: uid } = user;
  const { username } = useParams();
  const { data, status, error } = useAxios(`/api/users/${username}`);
  const userData = uid === username ? user : data?.user;
  const { data: posts } = useAxios(`/api/posts/user/${username}`);

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
      {posts?.posts && <PostsListing posts={posts?.posts} />}
    </Box>
  );
};

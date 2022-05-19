import { Box, VStack, Spinner, Text } from '@chakra-ui/react';
import { PostCard } from 'components';
import { useAxios } from 'hooks';
import { useParams } from 'react-router-dom';

export const SinglePost = () => {
  const { postID } = useParams();
  const { data, status, error } = useAxios(`/api/posts/${postID}`);
  const postData = data?.post;

  return (
    <Box>
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
      {postData && <PostCard postData={postData} />}
    </Box>
  );
};

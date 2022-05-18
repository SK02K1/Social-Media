import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { getAllPosts } from 'app/features';
import { PostCard } from 'components';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((store) => store.posts);

  useEffect(() => {
    if (!posts) {
      dispatch(getAllPosts());
    }
  }, [posts, dispatch]);

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
      {posts &&
        posts.map((postData) => {
          return <PostCard key={postData._id} postData={postData} />;
        })}
    </Box>
  );
};

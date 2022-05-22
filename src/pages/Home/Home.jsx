import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { getAllPosts, getAllBookmarks } from 'app/features';
import { CreatePost, PostCard } from 'components';

export const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth.userData);
  const { bookmarks } = useSelector((store) => store.bookmarks);
  const { posts, status, error } = useSelector((store) => store.posts);

  useEffect(() => {
    (async () => {
      dispatch(getAllPosts());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!bookmarks) {
      dispatch(getAllBookmarks({ token }));
    }
  }, [bookmarks, dispatch, token]);

  return (
    <Box>
      <CreatePost />

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
        status !== 'pending' &&
        posts.map((postData) => {
          return <PostCard key={postData._id} postData={postData} />;
        })}
    </Box>
  );
};

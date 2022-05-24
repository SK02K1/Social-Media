import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { getAllPosts, getAllBookmarks } from 'app/features';
import { CreatePost, PostCard, SortPosts } from 'components';
import { filterByFollowingUser, sortPosts } from 'utilities';
import { useDocumentTitle } from 'hooks';

export const Home = () => {
  useDocumentTitle('Home');
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.auth.userData);
  const { bookmarks } = useSelector((store) => store.bookmarks);
  const { posts, status, error, sortBy } = useSelector((store) => store.posts);

  const filteredPosts = filterByFollowingUser({
    posts,
    following: user?.following,
    uid: user?.username,
  });

  const sortedPosts = sortPosts({ posts: filteredPosts, sortBy });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!bookmarks) {
      dispatch(getAllBookmarks({ token }));
    }
  }, [bookmarks, dispatch, token]);

  return (
    <Box>
      <CreatePost />
      <SortPosts />

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
        sortedPosts.map((postData) => {
          return <PostCard key={postData._id} postData={postData} />;
        })}
    </Box>
  );
};

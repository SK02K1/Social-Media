import { Box, Heading, Spinner, VStack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getAllBookmarks } from 'app/features';
import { PostCard, Suggestions } from 'components';
import { filterByNotFollowingUser } from 'utilities';

export const Explore = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.auth.userData);
  const { bookmarks } = useSelector((store) => store.bookmarks);
  const { posts, status, error } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!bookmarks) {
      dispatch(getAllBookmarks({ token }));
    }
  }, [bookmarks, dispatch, token]);

  const filteredPosts = filterByNotFollowingUser({
    posts,
    following: user?.following,
    uid: user?.username,
  });

  return (
    <Box>
      <Heading textAlign='center' fontSize='2xl' mb={8}>
        Explore
      </Heading>
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

      <Box display={{ base: 'block', lg: 'none' }} mb={8}>
        {status !== 'pending' && <Suggestions />}
      </Box>

      {posts && Boolean(filteredPosts?.length)
        ? status !== 'pending' &&
          filteredPosts.map((postData) => {
            return <PostCard key={postData._id} postData={postData} />;
          })
        : status !== 'pending' && (
            <Text textAlign='center' fontSize='md'>
              Nothing to explore
            </Text>
          )}
    </Box>
  );
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { getAllBookmarks } from 'app/features';
import { PostCard } from 'components';

export const Bookmarks = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth.userData);
  const { bookmarks, status, error } = useSelector((store) => store.bookmarks);

  useEffect(() => {
    if (!bookmarks) {
      dispatch(getAllBookmarks({ token }));
    }
  }, [bookmarks, dispatch, token]);

  return (
    <Box>
      <Heading textAlign='center' fontSize='2xl' mb={8}>
        Bookmarks
      </Heading>
      {status === 'pending' && !bookmarks && (
        <VStack w='full' my={8}>
          <Spinner speed='0.2s' size='sm' />
        </VStack>
      )}

      {error && (
        <Text textAlign='center' my={4} color='red.500' fontSize='xl'>
          {error}
        </Text>
      )}
      {bookmarks &&
        bookmarks.map((postData) => {
          return <PostCard key={postData._id} postData={postData} />;
        })}
    </Box>
  );
};

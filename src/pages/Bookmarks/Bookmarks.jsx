import { useSelector } from 'react-redux';
import { Box, Heading, Spinner, Text, VStack } from '@chakra-ui/react';

import { PostCard } from 'components';

export const Bookmarks = () => {
  const { bookmarks, status, error } = useSelector((store) => store.bookmarks);

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

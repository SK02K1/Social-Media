import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, VStack, Spinner, Text } from '@chakra-ui/react';
import { PostCard, AddComment, CommentsListing } from 'components';

export const SinglePost = () => {
  const { postID } = useParams();
  const { posts } = useSelector((store) => store.posts);
  const [postData, setPostData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        const { data, status } = await axios.get(`/api/posts/${postID}`);
        if (status === 200) {
          setPostData(data?.post);
        }
      } catch (error) {
        setError('Failed to fetch the request post');
      } finally {
        setShowLoader(false);
      }
    })();
  }, [posts, postID]);

  return (
    <Box pb={20}>
      {showLoader && (
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
      {postData && <AddComment postID={postID} />}
      {postData && <CommentsListing postData={postData} />}
    </Box>
  );
};

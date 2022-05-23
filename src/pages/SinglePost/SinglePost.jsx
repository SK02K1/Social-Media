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
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    (async () => {
      try {
        setStatus('pending');
        const { data, status } = await axios.get(`/api/posts/${postID}`);
        if (status === 200) {
          setPostData(data?.post);
          setStatus('succeeded');
        }
      } catch (error) {
        setStatus('rejected');
      }
    })();
  }, [posts, postID]);

  return (
    <Box pb={20}>
      {status === 'rejected' && (
        <Text textAlign='center' my={4} color='red.500' fontSize='xl'>
          Failed to fetch the requested post
        </Text>
      )}
      {postData && <PostCard postData={postData} />}
      {status === 'pending' && (
        <VStack w='full' my={8}>
          <Spinner speed='0.2s' size='sm' />
        </VStack>
      )}
      {postData && <AddComment postID={postID} />}
      {postData && <CommentsListing postData={postData} />}
    </Box>
  );
};

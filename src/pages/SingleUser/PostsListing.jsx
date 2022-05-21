import { VStack } from '@chakra-ui/react';
import { PostCard } from 'components';

export const PostsListing = ({ posts }) => {
  return (
    <VStack spacing={4} w='full' my={4}>
      {posts.map((postData) => {
        return <PostCard key={postData._id} postData={postData} />;
      })}
    </VStack>
  );
};

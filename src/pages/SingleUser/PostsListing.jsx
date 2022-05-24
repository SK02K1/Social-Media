import { VStack } from '@chakra-ui/react';
import { PostCard } from 'components';
import { useSelector } from 'react-redux';

export const PostsListing = ({ posts }) => {
  const { user } = useSelector((store) => store.user);
  return (
    <VStack spacing={4} w='full' my={4}>
      {posts.map((postData) => {
        return (
          <PostCard
            key={postData._id}
            postData={
              postData.username === user.username
                ? { ...postData, ...user }
                : postData
            }
          />
        );
      })}
    </VStack>
  );
};

import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getPostByID } from 'utilities';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const CommentsListing = ({ postData }) => {
  const { _id } = postData;
  const { username: uid } = useSelector((store) => store.auth.userData.user);
  const { posts } = useSelector((store) => store.posts);
  const { comments } = getPostByID({ posts, postID: _id });
  const commentCardBg = useColorModeValue('white', 'gray.700');

  return (
    <VStack spacing={4} alignItems='flex-start'>
      {comments.map(
        ({ _id, text, firstName, lastName, avatarURL, username }) => {
          const fullname = `${firstName} ${lastName}`;
          return (
            <HStack
              key={_id}
              spacing={4}
              my={4}
              px={4}
              py={8}
              justifyContent='space-between'
              alignItems='flex-start'
              bg={commentCardBg}
              borderRadius='lg'
              boxShadow='xl'
              w='full'
            >
              <Avatar size='md' name={fullname} src={avatarURL} />
              <VStack width='full' h='auto' alignItems='flex-start' spacing={6}>
                <HStack w='full' justifyContent='space-between'>
                  <HStack spacing={2}>
                    <VStack spacing={1} alignItems='flex-start'>
                      <Text fontWeight='600' noOfLines={0}>
                        {fullname}
                      </Text>
                      <Text fontSize='sm' opacity={0.6}>
                        @{username}
                      </Text>
                    </VStack>
                  </HStack>
                  {uid === username && (
                    <Box fontSize='lg'>
                      <BsThreeDotsVertical />
                    </Box>
                  )}
                </HStack>
                <Text w='full' whiteSpace='pre-wrap'>
                  {text}
                </Text>
              </VStack>
            </HStack>
          );
        }
      )}
    </VStack>
  );
};

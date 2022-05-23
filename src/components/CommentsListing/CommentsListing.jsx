import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { UserAvatar } from 'components';
import { useSelector } from 'react-redux';

import { CommentControls } from './CommentControls';

export const CommentsListing = ({ postData }) => {
  const { _id: postID, comments } = postData;
  const { username: uid } = useSelector((store) => store.auth.userData.user);
  const commentCardBg = useColorModeValue('white', 'gray.700');

  return (
    <VStack spacing={4} alignItems='flex-start'>
      {[...comments]
        .reverse()
        .map(
          ({
            _id: commentID,
            text,
            firstName,
            lastName,
            avatarURL,
            username,
          }) => {
            const fullname = `${firstName} ${lastName}`;
            return (
              <HStack
                key={commentID}
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
                <UserAvatar
                  size='md'
                  userData={{ firstName, lastName, username, avatarURL }}
                />
                <VStack
                  width='full'
                  h='auto'
                  alignItems='flex-start'
                  spacing={6}
                >
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
                        <CommentControls
                          postID={postID}
                          commentID={commentID}
                          comment={text}
                        />
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

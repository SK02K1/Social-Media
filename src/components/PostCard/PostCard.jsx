import {
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { MdOutlineModeComment } from 'react-icons/md';
import { BiShareAlt } from 'react-icons/bi';
import { BsHeart, BsBookmark } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { PostCardControls } from './PostCardControls';
import { useSelector } from 'react-redux';

export const PostCard = ({ postData }) => {
  const { username: uid } = useSelector((store) => store.auth.userData.user);
  const {
    _id,
    firstName,
    lastName,
    username,
    content,
    img,
    avatarURL,
    likes,
    comments,
  } = postData;
  const { likeCount } = likes;
  const commentCount = comments.length;

  const fullname = `${firstName} ${lastName}`;
  const isMyPost = username === uid;

  return (
    <HStack
      spacing={4}
      mb={8}
      px={4}
      py={8}
      justifyContent='space-between'
      alignItems='flex-start'
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='lg'
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
          {isMyPost && (
            <Box fontSize='lg'>
              <PostCardControls postID={_id} />
            </Box>
          )}
        </HStack>
        {img && <img src={img} alt='post' />}
        <Text
          as={Link}
          to={`/posts/${_id}`}
          cursor='pointer'
          whiteSpace='pre-wrap'
        >
          {content}
        </Text>
        <HStack w='full' fontSize='lg' justifyContent='space-between'>
          <HStack alignItems='center'>
            <BsHeart />
            <Text fontSize='sm'>{likeCount}</Text>
          </HStack>
          <HStack as={Link} to={`/posts/${_id}`} alignItems='center'>
            <MdOutlineModeComment />
            <Text fontSize='sm'>{commentCount}</Text>
          </HStack>
          <BiShareAlt />
          <BsBookmark />
        </HStack>
      </VStack>
    </HStack>
  );
};

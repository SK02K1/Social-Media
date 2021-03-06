import { Box, HStack, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';

import { MdOutlineModeComment } from 'react-icons/md';

import {
  BsHeart,
  BsBookmark,
  BsHeartFill,
  BsBookmarkFill,
} from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { PostCardControls } from './PostCardControls';
import { useDispatch, useSelector } from 'react-redux';
import { isPostAlreadyBookmarked, isPostAlreadyLiked } from 'utilities';
import {
  likeDislikePost,
  addToBookmarks,
  removeFromBookmarks,
} from 'app/features';
import { UserAvatar } from 'components';
import { useState } from 'react';
import { useChakraToast } from 'hooks';

export const PostCard = ({ postData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const chakraToast = useChakraToast();
  const [isLikeActionPending, setIsLikeActionPending] = useState(false);
  const { token } = useSelector((store) => store.auth.userData);
  const { bookmarks, status: bookmarksStatus } = useSelector(
    (store) => store.bookmarks
  );
  const { username: uid } = user;
  const {
    _id,
    firstName,
    lastName,
    username,
    content,
    img,
    avatarURL,
    comments,
    likes,
    createdAt,
  } = postData;

  const { likeCount, likedBy } = likes;
  const commentCount = comments.length;
  const isMyPost = username === uid;
  const isPostLiked = isPostAlreadyLiked({ likedBy, uid });
  const isPostBookmarked = isPostAlreadyBookmarked({ bookmarks, postID: _id });
  const fullname = isMyPost
    ? `${user.firstName} ${user.lastName}`
    : `${firstName} ${lastName}`;

  const likeDislikeHandler = async () => {
    try {
      setIsLikeActionPending(true);
      const action = isPostLiked ? 'dislike' : 'like';
      const { meta, payload } = await dispatch(
        likeDislikePost({ postID: _id, action, token })
      );
      if (meta.requestStatus === 'rejected') {
        chakraToast({ meta, payload });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeActionPending(false);
    }
  };

  const bookmarkHandler = () => {
    dispatch(
      isPostBookmarked
        ? removeFromBookmarks({ postID: _id, token })
        : addToBookmarks({ postID: _id, token })
    );
  };

  return (
    <HStack
      w='full'
      spacing={4}
      mb={8}
      px={4}
      py={8}
      justifyContent='space-between'
      alignItems='flex-start'
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='lg'
      boxShadow='xl'
    >
      <UserAvatar
        size='md'
        userData={
          isMyPost
            ? {
                avatarURL: user.avatarURL,
                firstName: user.firstName,
                lastName: user.lastName,
                username,
              }
            : { avatarURL, firstName, lastName, username }
        }
      />
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
              <PostCardControls postData={postData} />
            </Box>
          )}
        </HStack>
        {img && <img src={img} alt='post' />}
        <Text
          w='full'
          as={Link}
          to={`/posts/${_id}`}
          cursor='pointer'
          whiteSpace='pre-wrap'
        >
          {content}
        </Text>
        <Text opacity={0.5} fontSize='sm' fontWeight={600}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Text>
        <HStack w='full' fontSize='lg' justifyContent='space-between'>
          <HStack
            as='button'
            onClick={likeDislikeHandler}
            alignItems='center'
            disabled={isLikeActionPending}
            _disabled={{ cursor: 'not-allowed' }}
          >
            {isPostLiked ? <BsHeartFill /> : <BsHeart />}
            <Text fontSize='sm'>{likeCount}</Text>
          </HStack>
          <HStack as={Link} to={`/posts/${_id}`} alignItems='center'>
            <MdOutlineModeComment />
            <Text fontSize='sm'>{commentCount}</Text>
          </HStack>
          <HStack
            onClick={bookmarkHandler}
            as='button'
            alignItems='center'
            _disabled={{ cursor: 'not-allowed' }}
            disabled={bookmarksStatus === 'pending'}
          >
            {isPostBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

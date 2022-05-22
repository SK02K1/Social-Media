import { Box, HStack, VStack, Text, useColorModeValue } from '@chakra-ui/react';

import { MdOutlineModeComment } from 'react-icons/md';
import { BiShareAlt } from 'react-icons/bi';
import {
  BsHeart,
  BsBookmark,
  BsHeartFill,
  BsBookmarkFill,
} from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { PostCardControls } from './PostCardControls';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostByID,
  isPostAlreadyBookmarked,
  isPostAlreadyLiked,
} from 'utilities';
import {
  likeDislikePost,
  addToBookmarks,
  removeFromBookmarks,
} from 'app/features';
import { UserAvatar } from 'components';

export const PostCard = ({ postData }) => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((store) => store.posts);
  const { user, token } = useSelector((store) => store.auth.userData);
  const { bookmarks, status: bookmarksStatus } = useSelector(
    (store) => store.bookmarks
  );
  const { username: uid } = user;
  const { _id } = postData;
  const currentPost = getPostByID({ posts, postID: _id });

  const {
    firstName,
    lastName,
    username,
    content,
    img,
    avatarURL,
    comments,
    likes,
  } = currentPost;

  const { likeCount, likedBy } = likes;
  const commentCount = comments.length;

  const isMyPost = username === uid;
  const isPostLiked = isPostAlreadyLiked({ likedBy, uid });
  const isPostBookmarked = isPostAlreadyBookmarked({ bookmarks, postID: _id });
  const fullname = isMyPost
    ? `${user.firstName} ${user.lastName}`
    : `${firstName} ${lastName}`;

  const likeDislikeHandler = () => {
    const action = isPostLiked ? 'dislike' : 'like';
    dispatch(likeDislikePost({ postID: _id, action, token }));
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
              <PostCardControls postID={_id} />
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
        <HStack w='full' fontSize='lg' justifyContent='space-between'>
          <HStack
            as='button'
            onClick={likeDislikeHandler}
            alignItems='center'
            disabled={status === 'pending'}
            _disabled={{ cursor: 'not-allowed' }}
          >
            {isPostLiked ? <BsHeartFill /> : <BsHeart />}
            <Text fontSize='sm'>{likeCount}</Text>
          </HStack>
          <HStack as={Link} to={`/posts/${_id}`} alignItems='center'>
            <MdOutlineModeComment />
            <Text fontSize='sm'>{commentCount}</Text>
          </HStack>
          <BiShareAlt />
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

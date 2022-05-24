import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { PostsListing } from './PostsListing';
import { ProfileCard } from 'components';

import { useEffect, useState } from 'react';
import { getUser, getUserPosts } from 'app/features';

export const SingleUser = () => {
  const { username } = useParams();
  const { posts } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.user);
  const { status, error } = useSelector((store) => store.user);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { payload: userPayload, meta: userMeta } = await dispatch(
          getUser({ username })
        );
        if (userMeta?.requestStatus === 'fulfilled') {
          setUserData(userPayload?.user);
        } else {
          throw new Error(userPayload.errorMessage);
        }
        const { payload: PostsPayload, meta: PostsMeta } = await dispatch(
          getUserPosts({ username })
        );

        if (PostsMeta?.requestStatus === 'fulfilled') {
          setUserPosts(PostsPayload?.posts);
        } else {
          throw new Error(PostsPayload.errorMessage);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch, username, posts, user]);

  useEffect(() => {
    return () => {
      setUserData(null);
      setUserPosts(null);
    };
  }, [username]);

  return (
    <Box>
      {userData && <ProfileCard userData={userData} />}
      {status === 'pending' && (
        <VStack w='full' my={8}>
          <Spinner speed='0.2s' size='sm' />
        </VStack>
      )}
      {error && (
        <Text textAlign='center' my={4} color='red.500' fontSize='xl'>
          {error}
        </Text>
      )}
      {userPosts && status !== 'pending' && <PostsListing posts={userPosts} />}
    </Box>
  );
};

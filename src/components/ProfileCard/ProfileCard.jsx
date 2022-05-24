import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkIcon } from '@chakra-ui/icons';
import { isMyProfile } from 'utilities';

import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Link,
  Button,
  Spinner,
} from '@chakra-ui/react';

// import { followUser, unfollowUser } from 'app/features';
import { EditProfile } from './EditProfileModal';
import { UserAvatar } from 'components';

export const ProfileCard = ({ userData }) => {
  // const { username: uid } = userData;

  const { token } = useSelector((store) => store.auth.userData);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // const [showLoader, setShowLoader] = useState(false);
  const {
    _id,
    firstName,
    lastName,
    username,
    bio,
    siteLink,
    // followers,
    // following,
  } = userData;

  const fullname = `${firstName} ${lastName}`;
  const myProfile = isMyProfile({ user, userData });

  // const alreadyFollowed = Boolean(
  //   user.following.find(({ _id: userID }) => userID === _id)
  // );

  // const handleFollow = async () => {
  //   setShowLoader(true);
  //   try {
  //     await dispatch(followUser({ token, userID: _id }));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setShowLoader(false);
  //   }
  // };

  // const handleUnfollow = async () => {
  //   setShowLoader(true);
  //   try {
  //     await dispatch(unfollowUser({ token, userID: _id }));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setShowLoader(false);
  //   }
  // };

  return (
    <VStack
      spacing={2}
      alignItems='flex-start'
      bg={useColorModeValue('white', 'gray.700')}
      p={4}
      borderRadius='lg'
      boxShadow='xl'
    >
      <HStack w='full' justifyContent='space-between' alignItems='flex-start'>
        <UserAvatar userData={userData} size='xl' />
        {/* {!(username === uid) &&
          (alreadyFollowed ? (
            <Button
              // onClick={handleUnfollow}
              colorScheme='red'
            >
              {showLoader ? <Spinner speed='0.2s' size='sm' /> : 'Unfollow'}
            </Button>
          ) : (
            <Button
              // onClick={handleFollow}
              colorScheme='blue'
            >
              {showLoader ? <Spinner speed='0.2s' size='sm' /> : 'Follow'}
            </Button>
          ))} */}
        {myProfile && <EditProfile userData={userData} />}
      </HStack>
      <VStack spacing={-1} alignItems='flex-start'>
        <Text fontSize='lg' fontWeight='600'>
          {fullname}
        </Text>
        <Text siz='xs' opacity={0.5}>
          @{username}
        </Text>
      </VStack>
      {/* <HStack>
        <Text>Followers({followers.length})</Text>
        <Text>Following({following.length})</Text>
      </HStack> */}
      {bio && <Text>{bio}</Text>}
      {siteLink && (
        <HStack>
          <LinkIcon />
          <Link
            as='a'
            color='blue.500'
            href={siteLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            {siteLink}
          </Link>
        </HStack>
      )}
    </VStack>
  );
};

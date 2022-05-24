import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkIcon } from '@chakra-ui/icons';
import { isMyProfile } from 'utilities';
import { FollowersModal } from './FollowersModal';

import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Link,
  Button,
  Spinner,
} from '@chakra-ui/react';

import { EditProfile } from './EditProfileModal';
import { UserAvatar } from 'components';
import { followUser, unfollowUser } from 'app/features';
import { useChakraToast } from 'hooks';
import { FollowingModal } from './FollowingModal';

export const ProfileCard = ({ userData }) => {
  const chakraToast = useChakraToast();
  const { user } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const {
    _id,
    firstName,
    lastName,
    username,
    bio,
    siteLink,
    followers,
    following,
  } = userData;

  const fullname = `${firstName} ${lastName}`;
  const myProfile = isMyProfile({ user, userData });

  const alreadyFollowed = Boolean(
    user.following.find(({ _id: userID }) => userID === _id)
  );

  const handleFollow = async () => {
    setShowLoader(true);
    try {
      const { payload, meta } = await dispatch(
        followUser({ token, userID: _id })
      );
      chakraToast({ meta, payload });
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleUnfollow = async () => {
    setShowLoader(true);
    try {
      const { payload, meta } = await dispatch(
        unfollowUser({ token, userID: _id })
      );
      chakraToast({ meta, payload });
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

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
        {!(username === user.username) &&
          (alreadyFollowed ? (
            <Button onClick={handleUnfollow} colorScheme='red'>
              {showLoader ? <Spinner speed='0.2s' size='sm' /> : 'Unfollow'}
            </Button>
          ) : (
            <Button onClick={handleFollow} colorScheme='blue'>
              {showLoader ? <Spinner speed='0.2s' size='sm' /> : 'Follow'}
            </Button>
          ))}
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
      <HStack>
        <HStack>
          <Text fontWeight={700}>{followers.length}</Text>
          <FollowersModal followers={followers} />
        </HStack>
        <HStack>
          <Text fontWeight={700}>{following.length}</Text>
          <FollowingModal following={following} />
        </HStack>
      </HStack>
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

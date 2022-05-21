import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Link,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { LinkIcon } from '@chakra-ui/icons';
import { UserAvatar } from 'components';
import { EditProfile } from './EditProfileModal';

export const ProfileCard = ({ userData }) => {
  const {
    user: { username: uid },
  } = useSelector((store) => store.auth.userData);
  const { firstName, lastName, username, bio, siteLink, followers, following } =
    userData;
  const fullname = `${firstName} ${lastName}`;

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
        {username === uid && <EditProfile userData={userData} />}
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
        <Text>Followers({followers.length})</Text>
        <Text>Following({following.length})</Text>
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

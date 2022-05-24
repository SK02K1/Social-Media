import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { filterUsersByNotFollowed } from 'utilities';
import { useDispatch, useSelector } from 'react-redux';
import { UserAvatar } from 'components';
import { followUser } from 'app/features';
import { useChakraToast } from 'hooks';

export const Suggestions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.auth.userData);
  const [users, setUsers] = useState(null);
  const chakraToast = useChakraToast();

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axios.get('/api/users');
        if (status === 200) {
          setUsers(data?.users);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const filteredUsers = filterUsersByNotFollowed({
    users,
    following: user?.following,
    uid: user?.username,
  });

  const handleFollow = async ({ userID }) => {
    try {
      const { payload, meta } = await dispatch(followUser({ token, userID }));
      chakraToast({ meta, payload });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='lg'
      boxShadow='xl'
    >
      <VStack alignItems='flex-start' justifyContent='space-evenly' spacing={4}>
        {filteredUsers &&
          filteredUsers.map((userData) => {
            const { _id, firstName, lastName, username } = userData;
            return (
              <HStack
                key={_id}
                padding={4}
                justifyContent='space-between'
                alignItems='flex-start'
                w='full'
              >
                <HStack>
                  <UserAvatar userData={userData} size='md' />
                  <VStack spacing={1} alignItems='flex-start'>
                    <Text>
                      {firstName} {lastName}
                    </Text>
                    <Text opacity={0.5} fontSize='sm'>
                      @{username}
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  onClick={() => handleFollow({ userID: _id })}
                  colorScheme='blue'
                  size='sm'
                >
                  Follow
                </Button>
              </HStack>
            );
          })}
      </VStack>
    </Box>
  );
};

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { searchUserByQuery } from 'utilities';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.700');
  const timeoutID = useRef(null);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchedUsers(null);
  };

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

  useEffect(() => {
    if (searchQuery) {
      if (timeoutID?.current) {
        clearTimeout(timeoutID?.current);
      }
      timeoutID.current = setTimeout(() => {
        setSearchedUsers(searchUserByQuery({ users, searchQuery }));
      }, 400);
    } else {
      setSearchedUsers(null);
    }
  }, [searchQuery, timeoutID, users]);

  return (
    <VStack>
      <Input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder='Search Posts, People, anything'
      />
      {searchQuery && searchedUsers && (
        <VStack
          bg={bgColor}
          w='full'
          alignItems='flex-start'
          borderRadius='base'
          maxH='10rem'
          overflowY='scroll'
          boxShadow='lg'
        >
          {searchedUsers.map((userData) => {
            const { _id, firstName, lastName, username, avatarURL } = userData;
            const fullname = `${firstName} ${lastName}`;
            return (
              <HStack
                onClick={clearSearch}
                as={Link}
                to={`/users/${username}`}
                cursor='pointer'
                key={_id}
                w='full'
                p={2}
                spacing={4}
                borderBottom='1px'
              >
                <Avatar src={avatarURL} name={fullname} size='md' />
                <Text>{fullname}</Text>
              </HStack>
            );
          })}
          {searchQuery && searchedUsers && !Boolean(searchedUsers?.length) && (
            <Text p={4} mx='auto' textAlign='center'>
              No user found
            </Text>
          )}
        </VStack>
      )}
    </VStack>
  );
};

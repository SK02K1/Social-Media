import {
  FormLabel,
  HStack,
  Input,
  Textarea,
  useColorModeValue,
  VStack,
  Button,
} from '@chakra-ui/react';

import { BsImageFill } from 'react-icons/bs';

import { createNewPost } from 'app/features';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserAvatar } from 'components';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const { token, user } = useSelector((store) => store.auth.userData);

  const { status } = useSelector((store) => store.posts);

  const isEmpty = !Boolean(content.length);

  const inputChangeHandler = (e) => setContent(e.target.value);

  const postBtnHandler = () => {
    const postData = { content };
    dispatch(createNewPost({ token, postData }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setContent('');
    }
  }, [status]);

  return (
    <HStack
      mb={8}
      px={4}
      py={8}
      justifyContent='space-between'
      alignItems='flex-start'
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius='lg'
      boxShadow='xl'
    >
      <UserAvatar userData={user} size='md' />
      <VStack width='full' h='auto' alignItems='flex-start' spacing={6}>
        <Textarea
          onChange={inputChangeHandler}
          size='md'
          rows={5}
          borderRadius='base'
          p={4}
          resize='none'
          value={content}
          placeholder='Share your moment'
        />
        <HStack
          w='full'
          fontSize='lg'
          justifyContent='space-between'
          alignItems='center'
        >
          <Button
            ml='auto'
            onClick={postBtnHandler}
            colorScheme='blue'
            size='sm'
            disabled={isEmpty || status === 'pending'}
          >
            Post
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

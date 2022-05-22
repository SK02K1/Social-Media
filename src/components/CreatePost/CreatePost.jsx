import {
  HStack,
  Textarea,
  useColorModeValue,
  VStack,
  Button,
  Spinner,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from 'app/features';
import { UserAvatar } from 'components';
import { useChakraToast } from 'hooks';

export const CreatePost = () => {
  const dispatch = useDispatch();
  const chakraToast = useChakraToast();
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { token, user } = useSelector((store) => store.auth.userData);

  const isEmpty = !Boolean(content.length);

  const inputChangeHandler = (e) => setContent(e.target.value);

  const postBtnHandler = async () => {
    const postData = { content };
    try {
      setIsPosting(true);
      const { meta, payload } = await dispatch(
        createNewPost({ token, postData })
      );
      chakraToast({ meta, payload });
      if (meta?.requestStatus === 'fulfilled') {
        setContent('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

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
            disabled={isEmpty || isPosting}
          >
            {isPosting ? <Spinner speed='0.2s' size='md' /> : 'Post'}
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

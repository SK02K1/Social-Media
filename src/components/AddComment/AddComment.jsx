import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { addComment } from 'app/features';
import { UserAvatar } from 'components';
import { useChakraToast } from 'hooks';

export const AddComment = ({ postID }) => {
  const dispatch = useDispatch();
  const chakraToast = useChakraToast();
  const [comment, setComment] = useState('');
  const { user, token } = useSelector((store) => store.auth.userData);
  const [showLoader, setShowloader] = useState(false);

  const { username, avatarURL, firstName, lastname } = user;

  const inputChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setShowloader(true);
      const { meta, payload } = await dispatch(
        addComment({ postID, token, commentData: { text: comment } })
      );
      if (meta?.requestStatus === 'fulfilled') {
        setComment('');
      }
      chakraToast({ meta, payload });
    } catch (error) {
      console.error(error);
    } finally {
      setShowloader(false);
    }
  };

  return (
    <HStack
      onSubmit={commentSubmitHandler}
      as='form'
      bg={useColorModeValue('white', 'gray.700')}
      p={4}
      alignItems='center'
      boxShadow='md'
      borderRadius='base'
    >
      <UserAvatar
        size='md'
        userData={{ firstName, lastname, username, avatarURL }}
      />
      <FormControl>
        <InputGroup>
          <Input
            onChange={inputChangeHandler}
            value={comment}
            name='comment'
            id='comment'
            placeholder='Write you comment'
            required
          />
          <InputRightElement h={'full'}>
            {showLoader ? (
              <Spinner size='sm' speed='0.2s' />
            ) : (
              <Button colorScheme='blue' type='submit' variant={'ghost'}>
                <AddIcon />
              </Button>
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </HStack>
  );
};

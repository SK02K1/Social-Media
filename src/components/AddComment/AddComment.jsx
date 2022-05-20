import { AddIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from 'app/features';

export const AddComment = ({ postID }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const { user, token } = useSelector((store) => store.auth.userData);

  const { username, avatarURL, firstName, lastname } = user;
  const fullname = `${firstName} ${lastname}`;

  const inputChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment({ postID, token, commentData: { text: comment } }));
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
      <Avatar name={fullname} src={avatarURL} />
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
            <Button colorScheme='blue' type='submit' variant={'ghost'}>
              <AddIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </HStack>
  );
};

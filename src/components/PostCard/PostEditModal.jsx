import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editPost } from 'app/features';

export const PostEditModal = ({ postID }) => {
  const { token } = useSelector((store) => store.auth.userData);
  const { posts, status } = useSelector((store) => store.posts);

  const post = posts.find(({ _id }) => _id === postID);
  const { content: oldContent } = post;

  const [newContent, setNewContent] = useState(oldContent);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => setNewContent(e.target.value);

  const editBtnHandler = () => {
    const postData = { ...post, content: newContent };
    dispatch(editPost({ postData, token }));
  };

  const isContentChanged = oldContent !== newContent && newContent;
  const hasContent = Boolean(newContent.length);

  useEffect(() => {
    if (status !== 'pending') {
      onClose();
    }
  }, [status, onClose]);

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} minW={100} size='sm' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={inputChangeHandler}
              size='md'
              rows={5}
              borderRadius='base'
              p={4}
              resize='none'
              value={newContent}
              placeholder='Share your moment'
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='red'
              mr={3}
              onClick={onClose}
              variant='outline'
            >
              Close
            </Button>
            <Button
              onClick={editBtnHandler}
              colorScheme='blue'
              disabled={
                !isContentChanged || status === 'pending' || !hasContent
              }
            >
              {status === 'pending' ? (
                <Spinner size='sm' speed='0.2s' />
              ) : (
                'Save'
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

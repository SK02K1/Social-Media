import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import { editPost } from 'app/features';
import { useChakraToast } from 'hooks';

export const PostEditModal = ({ postData }) => {
  const [newContent, setNewContent] = useState(postData?.content);
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useSelector((store) => store.auth.userData);
  const chakraToast = useChakraToast();
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => setNewContent(e.target.value);

  const editBtnHandler = async () => {
    try {
      setIsEditing(true);
      const { meta, payload } = await dispatch(
        editPost({ postData: { ...postData, content: newContent }, token })
      );
      if (meta?.requestStatus === 'fulfilled') {
        onClose();
      }
      chakraToast({ meta, payload });
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  const isContentChanged = postData?.content !== newContent && newContent;
  const hasContent = Boolean(newContent.length);

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
              disabled={!isContentChanged || isEditing || !hasContent}
            >
              {isEditing ? <Spinner size='sm' speed='0.2s' /> : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

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

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editComment } from 'app/features';
import { useChakraToast } from 'hooks';

export const CommentEditModal = ({
  postID,
  commentID,
  comment: oldComment,
}) => {
  const { token } = useSelector((store) => store.auth.userData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newComment, setNewComment] = useState(oldComment);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const chakraToast = useChakraToast();

  const inputChangeHandler = (e) => setNewComment(e.target.value);

  const editBtnHandler = async () => {
    try {
      setIsEditing(true);
      const { meta, payload } = await dispatch(
        editComment({
          commentData: { text: newComment },
          postID,
          commentID,
          token,
        })
      );
      chakraToast({ meta, payload });
      if (meta.requestStatus === 'fulfilled') {
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  const isContentChanged = oldComment !== newComment && newComment;
  const hasContent = Boolean(newComment.length);

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} minW={100} size='sm' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={inputChangeHandler}
              size='md'
              rows={5}
              borderRadius='base'
              p={4}
              resize='none'
              value={newComment}
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

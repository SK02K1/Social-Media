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

import { editComment } from 'app/features';

export const CommentEditModal = ({ postID, commentID }) => {
  const { token } = useSelector((store) => store.auth.userData);
  const { posts, status } = useSelector((store) => store.posts);

  const post = posts.find(({ _id }) => _id === postID);
  const { text: oldComment } = post.comments.find(
    ({ _id }) => _id === commentID
  );

  const [newComment, setNewComment] = useState(oldComment);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => setNewComment(e.target.value);

  const editBtnHandler = () => {
    dispatch(
      editComment({
        commentData: { text: newComment },
        postID,
        commentID,
        token,
      })
    );
  };

  const isContentChanged = oldComment !== newComment && newComment;
  const hasContent = Boolean(newComment.length);

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

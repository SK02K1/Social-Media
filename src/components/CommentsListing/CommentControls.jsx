import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { deleteComment } from 'app/features';
import { CommentEditModal } from './CommentEditModal';

export const CommentControls = ({ postID, commentID }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth.userData);

  const deletePostHandler = () => {
    dispatch(deleteComment({ postID, commentID, token }));
  };

  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList fontSize='sm' minW={150}>
        <CommentEditModal postID={postID} commentID={commentID} />
        <MenuItem
          onClick={deletePostHandler}
          fontWeight='600'
          color={useColorModeValue('red.600', 'red.400')}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

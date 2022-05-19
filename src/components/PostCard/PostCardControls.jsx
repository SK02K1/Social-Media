import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import { BsThreeDotsVertical } from 'react-icons/bs';

import { deletePost } from 'app/features';
import { useDispatch, useSelector } from 'react-redux';

export const PostCardControls = ({ postID }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth.userData);

  const deletePostHandler = () => {
    dispatch(deletePost({ postID, token }));
  };

  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList fontSize='sm' minW={150}>
        <MenuItem>Edit</MenuItem>
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

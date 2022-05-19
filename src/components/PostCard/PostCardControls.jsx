import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import { BsThreeDotsVertical } from 'react-icons/bs';

import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from 'app/features';
import { PostEditModal } from './PostEditModal';
import { useLocation, useNavigate } from 'react-router-dom';

export const PostCardControls = ({ postID }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth.userData);

  const deletePostHandler = () => {
    if (pathname.split('/')[1] === 'posts') {
      navigate('/', { replace: true });
    }
    dispatch(deletePost({ postID, token }));
  };

  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList fontSize='sm' minW={150}>
        <PostEditModal postID={postID} />
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

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deletePost, removeFromBookmarks } from 'app/features';
import { PostEditModal } from './PostEditModal';
import { useChakraToast } from 'hooks';

import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

import { BsThreeDotsVertical } from 'react-icons/bs';

export const PostCardControls = ({ postData }) => {
  const { _id: postID } = postData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chakraToast = useChakraToast();
  const { pathname } = useLocation();
  const { token } = useSelector((store) => store.auth.userData);

  const deletePostHandler = async () => {
    if (pathname.split('/')[1] === 'posts') {
      navigate('/', { replace: true });
    }
    try {
      dispatch(removeFromBookmarks({ postID, token }));
      const { payload, meta } = await dispatch(deletePost({ postID, token }));
      chakraToast({ meta, payload });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList fontSize='sm' minW={150}>
        <PostEditModal postData={postData} />
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

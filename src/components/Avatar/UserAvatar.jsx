import { Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const UserAvatar = ({ userData, size }) => {
  const { username, firstName, lastName, avatarURL } = userData;
  return (
    <Avatar
      as={Link}
      to={`/users/${username}`}
      size={size || 'md'}
      name={`${firstName} ${lastName}`}
      src={avatarURL}
    />
  );
};

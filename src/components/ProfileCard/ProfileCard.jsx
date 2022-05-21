import { UserAvatar } from 'components';

const { Box } = require('@chakra-ui/react');

export const ProfileCard = ({ userData }) => {
  return (
    <Box>
      <UserAvatar userData={userData} size='xl' />
    </Box>
  );
};

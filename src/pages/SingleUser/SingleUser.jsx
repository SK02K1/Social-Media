import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const SingleUser = () => {
  const { username } = useParams();
  return (
    <Box>
      <Heading textAlign='center' m={1}>
        Single User Page
      </Heading>
      <Text textAlign='center' m={1}>
        {username}
      </Text>
    </Box>
  );
};

import { Grid } from '@chakra-ui/react';

export const LayoutWrapper = ({ children }) => {
  return (
    <Grid templateColumns='repeat(7, 1fr)' gap={4}>
      {children}
    </Grid>
  );
};

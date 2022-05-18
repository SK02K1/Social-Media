import { Grid } from '@chakra-ui/react';

export const LayoutWrapper = ({ children }) => {
  return (
    <Grid
      // bg='yellow.600'
      templateColumns='repeat(7, 1fr)'
    >
      {children}
    </Grid>
  );
};

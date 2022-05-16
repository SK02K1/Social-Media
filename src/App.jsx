import { Route, Routes } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Navbar, RequiresAuth } from './components';
import { Posts, Login } from './app/features/';

export const App = () => {
  const appBg = useColorModeValue('#F7FAFC', '#1A202C');
  return (
    <Box bg={appBg} className='App'>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        {/* Private Routes */}
        <Route element={<RequiresAuth />}>
          <Route path='/' element={<Posts />} />
        </Route>
      </Routes>
    </Box>
  );
};

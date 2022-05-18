import { Route, Routes } from 'react-router-dom';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { Navbar, RequiresAuth } from 'components';
import { Home, Explore, Bookmarks, SingleUser } from 'pages';
import { Login, Signup } from 'app/features';

export const App = () => {
  const appBg = useColorModeValue('#F7FAFC', '#1A202C');
  return (
    <Box minH='100vh' bg={appBg} className='App'>
      <Navbar />
      <Container maxW='container.xl'>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* Private Routes */}
          <Route element={<RequiresAuth />}>
            <Route path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/users/:username' element={<SingleUser />} />
          </Route>
        </Routes>
      </Container>
    </Box>
  );
};

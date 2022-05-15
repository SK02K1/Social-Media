import { Route, Routes } from 'react-router-dom';
import { Navbar, RequiresAuth } from './components';
import { Posts, Login } from './app/features/';

export const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        {/* Private Routes */}
        <Route element={<RequiresAuth />}>
          <Route path='/' element={<Posts />} />
        </Route>
      </Routes>
    </div>
  );
};

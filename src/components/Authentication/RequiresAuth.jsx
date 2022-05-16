import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectUserData } from '../../app/features/authentication/authSlice';

export const RequiresAuth = () => {
  const location = useLocation();
  const userdata = useSelector(selectUserData);
  return userdata?.user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

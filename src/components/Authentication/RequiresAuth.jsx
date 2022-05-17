import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import {
  LayoutWrapper,
  ContentWrapper,
  LeftSideBar,
  RightSideBar,
  BottomBar,
} from 'components';
import { selectUserData } from 'app/features';

export const RequiresAuth = () => {
  const location = useLocation();
  const userdata = useSelector(selectUserData);
  return userdata?.user ? (
    <LayoutWrapper>
      <LeftSideBar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <RightSideBar />
      <BottomBar />
    </LayoutWrapper>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

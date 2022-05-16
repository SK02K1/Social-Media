import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetErrorMessage } from 'app/features';

export const useAuthErrorReset = () => {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      dispatch(resetErrorMessage());
    };
  }, [dispatch]);
};

import { useEffect } from 'react';
import useGetPage from './useGetPage';
import { setSearch } from '@/redux/features/other/otherSlice';
import { useAppDispatch } from '@/redux/hooks';

const useSearchEffects = () => {
  const dispatch = useAppDispatch();
  const page = useGetPage();

  useEffect(() => {
    dispatch(setSearch(''));
  }, []);

  useEffect(() => {
    if (page === 'users' || page === 'transports') {
      dispatch(setSearch(''));
    }
  }, [page]);
};

export default useSearchEffects;

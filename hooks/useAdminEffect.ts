import { getCompanies } from '@/store/actions/company/companyActions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAdminEffect = () => {
  const navigate = useRouter();
  const dispatch = useDispatch<TDispatch>();

  useEffect(() => {
    dispatch(getCompanies(navigate));
  }, []);
};

export default useAdminEffect;

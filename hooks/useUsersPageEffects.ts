import { getCompanyUsers } from '@/redux/features/company/companyService';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useUsersPageEffects = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const companyInDetails: ICompany | undefined | null = useAppSelector(
    selectCompanyInDetails
  ) as ICompany | undefined | null;

  useEffect(() => {
    if (companyInDetails?.id) {
      dispatch(getCompanyUsers({ navigate, companyId: companyInDetails.id, dispatch }));
    }
  }, [JSON.stringify(companyInDetails)]);
};

export default useUsersPageEffects;

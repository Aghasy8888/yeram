import { selectUserRole } from '@/redux/features/auth/authSlice';
import { selectCompanyInDetails, setCompanyInDetails } from '@/redux/features/company/companySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

const useGetCompanyFromStorage = () => {
  const dispatch = useAppDispatch();
  const companyInDetails: ICompany | null = useAppSelector(
    selectCompanyInDetails
  ) as ICompany | null;
  const userRole = useAppSelector(selectUserRole);

  useEffect(() => {
    if (typeof window !== 'undefined' && !companyInDetails) {
      const companyInDetails = JSON.parse(
        window.localStorage.getItem('companyInDetails') as string
      );

      if (companyInDetails && userRole) { 
        dispatch(setCompanyInDetails({ companyInDetails, userRole }));       
      }
    }
  }, [userRole]);
};

export default useGetCompanyFromStorage;

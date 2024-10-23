import { SUPER_ADMIN } from '@/data/stepConstants';
import { getUserInfo } from '@/redux/features/auth/userService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  selectUserInfo,
  selectUserRole,
} from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCompanyInDetails, selectOwnCompany, setCompanyInDetails } from '@/redux/features/company/companySlice';
import { getOwnCompany } from '@/redux/features/company/companyService';

const useGetOwnCompany = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const user: IUserInfo | null | undefined = useAppSelector(selectUserInfo);
  const userRole = useAppSelector(selectUserRole);
  const ownCompany = useAppSelector(selectOwnCompany);
  const companyInDetails: ICompany | {} | null = useAppSelector(
    selectCompanyInDetails
  );

  useEffect(() => {
    const companyId = user?.company;

    if (companyId) {
      dispatch(getOwnCompany({navigate, companyId: String(companyId), dispatch}));
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserInfo({ navigate, dispatch }));
  }, []);

  useEffect(() => {
    if (
      userRole &&
      userRole !== SUPER_ADMIN &&
      !(companyInDetails as ICompany)?.id
    ) {
      dispatch(setCompanyInDetails({ companyInDetails: {}, userRole }));
    }
  }, [userRole, ownCompany]);
};

export default useGetOwnCompany;

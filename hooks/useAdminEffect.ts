import { SUPER_ADMIN } from '@/data/stepConstants';
import { getCompanyTotalReports } from '@/helpers/helpers_5';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { getCompanies } from '@/redux/features/company/companyService';
import { selectCompanies } from '@/redux/features/company/companySlice';
import { setTransportLoading } from '@/redux/features/transport/transportSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAdminEffect = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(selectUserRole);
  const companies: ICompany[] | [] = useAppSelector(selectCompanies);
  const [companiesExist, setCompaniesExist] = useState(false);

  useEffect(() => {
    dispatch(getCompanies({ navigate, dispatch }));
    dispatch(setTransportLoading(false));
  }, []);

  useEffect(() => {
    if (userRole !== SUPER_ADMIN) navigate.push('/');
  }, [userRole]);

  useEffect(() => {
    if (companies) {
      setCompaniesExist(true);
    }
  }, [JSON.stringify(companies)]);

  useEffect(() => {
    companies?.forEach((company) => {
      getCompanyTotalReports(dispatch, navigate, company as ICompany);
    });
  }, [companiesExist]);
};

export default useAdminEffect;

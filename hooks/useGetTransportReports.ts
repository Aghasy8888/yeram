import { getCompanyTransportReports } from '@/helpers/helpers_5';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useGetTransportReports = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [companyExists, setCompanyExists] = useState(false);
  const companyInDetails: ICompany | undefined | null = useAppSelector(
    selectCompanyInDetails
  ) as ICompany | undefined | null;

  useEffect(() => {
    if (companyInDetails?.id) {
      setCompanyExists(true);
    }
  }, [JSON.stringify(companyInDetails)]);

  useEffect(() => {
    if (!companyExists) return;

    getCompanyTransportReports(
      dispatch,
      navigate,
      companyInDetails as ICompany
    );
  }, [companyExists]);
};

export default useGetTransportReports;

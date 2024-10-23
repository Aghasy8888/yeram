'use client';

import { useEffect } from 'react';
import { COMPANY_IN_DETAILS } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';

const useUpdateLocalStorage = () => {
  const companyInDetails = useAppSelector(selectCompanyInDetails);

  useEffect(() => {
    if (companyInDetails) {
        localStorage.setItem(COMPANY_IN_DETAILS, JSON.stringify(companyInDetails));        
    }
  }, [JSON.stringify(companyInDetails)]);
};

export default useUpdateLocalStorage;
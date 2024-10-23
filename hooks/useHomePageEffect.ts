import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import { HOURS, SUPER_ADMIN } from '@/data/stepConstants';
import { englishStepToRussian, formatDateForRequest } from '@/helpers';
import useRenderIfAuthenticated from './useRenderIfAuthenticated';
import useCheckLoginStatus from './useCheckLoginStatus';
import { getUserInfo } from '@/redux/features/auth/userService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectUserInfo,
  selectUserRole,
} from '@/redux/features/auth/authSlice';
import { setShortenedPeriodSelected } from '@/redux/features/other/otherSlice';
import { getOwnCompany } from '@/redux/features/company/companyService';
import {
  selectSubmittedTransports,
  selectTransports,
  setFirstNumberIsActive,
  setTransportLoading,
} from '@/redux/features/transport/transportSlice';
import {
  getTransports,
  reportTransportsInfo,
} from '@/redux/features/transport/transportService';

const useHomePageEffect = (setLoading: setBoolean) => {
  let reportDataFromStorage: string | null;
  const today = new Date();
  if (typeof window !== 'undefined') {
    reportDataFromStorage = window.localStorage.getItem('reportData');
  }
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const user: IUserInfo | null | undefined = useAppSelector(selectUserInfo);
  const userRole = useAppSelector(selectUserRole);
  const transports: ITransport[] = useAppSelector(selectTransports);
  const submittedTransports: ITransport[] = useAppSelector(selectSubmittedTransports);
  const firstTransportId = submittedTransports[0]?.id;
  useCheckLoginStatus();

  useLayoutEffect(() => {
    dispatch(setTransportLoading(true));
  }, []);

  useEffect(() => {
    if (userRole === SUPER_ADMIN) navigate.push('/adminOfConnected');
  }, [userRole]);

  useEffect(() => {
    dispatch(getUserInfo({ navigate, dispatch }));
  }, []);

  useEffect(() => {
    const companyId = user?.company;
    const parsedData: IReportBody = JSON.parse(reportDataFromStorage as string);

    if (companyId) {
      dispatch(getOwnCompany({ navigate, companyId: String(companyId), dispatch }));
      if (!reportDataFromStorage) {
        dispatch(getTransports({ dispatch, navigate, company_id: String(companyId) }));
      } else {
        dispatch(
          getTransports({ dispatch, navigate, company_id: String(companyId), parsedData })
        );
      }
    }
  }, [user]);

  useEffect(() => {
    if (firstTransportId && reportDataFromStorage) {
      const parsedData: IReportBody = JSON.parse(
        reportDataFromStorage as string
      );

      dispatch(
        reportTransportsInfo({
          dispatch,
          navigate,
          data: parsedData,
          company_id: String(user?.company),
        })
      );
    }
  }, [firstTransportId, user]);

  useEffect(() => {
    if (transports[0]?.isActive === undefined && !reportDataFromStorage) {
      dispatch(setFirstNumberIsActive());
    }
  }, [transports[0]?.isActive]);

  useEffect(() => {
    const reportData = {
      transport: [firstTransportId],
      start: formatDateForRequest(new Date()),
      end: formatDateForRequest(today),
      report_type: HOURS,
    };

    if (reportData.transport[0] && !reportDataFromStorage) {
      dispatch(
        reportTransportsInfo({
          dispatch,
          navigate,
          data: reportData,
          company_id: String(user?.company),
        })
      );
    }
  }, [firstTransportId, user]);

  useEffect(() => {
    if (reportDataFromStorage) {
      const parsedData: IReportBody = JSON.parse(
        reportDataFromStorage as string
      );
      let shortenedPeriodSelected = englishStepToRussian(
        parsedData.report_type
      ).slice(0, 3);
      dispatch(setShortenedPeriodSelected(shortenedPeriodSelected));
    }
  }, []);

  useRenderIfAuthenticated(setLoading);
};

export default useHomePageEffect;

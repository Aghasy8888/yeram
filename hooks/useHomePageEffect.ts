import { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { HOURS, SUPER_ADMIN } from '@/data/stepConstants';
import { englishStepToRussian, formatDateForRequest } from '@/helpers';
import {
  getTransports,
  reportTransportsInfo,
} from '@/store/actions/transport/transportActions';
import { getUserInfo } from '@/store/actions/user/userActions';
import useRenderIfAuthenticated from './useRenderIfAuthenticated';
import useCheckLoginStatus from './useCheckLoginStatus';
import { useAppSelector } from '@/store/store';
import {
  SET_FIRST_NUMBER_IS_ACTIVE,
  SET_LOADING_FALSE,
  TRANSPORT_LOADING,
} from '@/store/actions/transport/transportActionTypes';
import {
  SET_DATE_IS_SELECTED,
  SET_SHORTENED_SELECTED_PERIOD,
} from '@/store/actions/other/otherActionTypes';
import { getNextDay } from '@/helpers/helpers_2';

const useHomePageEffect = (setLoading: setBoolean) => {
  let reportDataFromStorage: string | null;
  const tomorrow = getNextDay(new Date());
  if (typeof window !== 'undefined') {
    reportDataFromStorage = window.localStorage.getItem('reportData');
  }
  const navigate = useRouter();
  const dispatch = useDispatch<TDispatch>();
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const userRole = useAppSelector((state) => state.authReducer.userRole);
  const transports: ITransport[] = useAppSelector(
    (state) => state.transportReducer.transports
  );
  const firstTransportId = transports[0]?.id;
  useCheckLoginStatus();

  useLayoutEffect(() => {
    dispatch({ type: TRANSPORT_LOADING });
  }, []);

  useEffect(() => {
    if (userRole === SUPER_ADMIN) navigate.push('/adminOfConnected');
  }, [userRole]);

  useEffect(() => {
    dispatch(getUserInfo(navigate));
  }, []);

  useEffect(() => {
    const companyId = user?.company_id;
    const parsedData: IReportBody = JSON.parse(reportDataFromStorage as string);

    if (companyId) {
      if (!reportDataFromStorage) {
        dispatch(getTransports(navigate, String(companyId)));
      } else {
        dispatch(getTransports(navigate, String(companyId), parsedData));
      }
    }
  }, [user]);

  useEffect(() => {
    if (firstTransportId && reportDataFromStorage) {
      const parsedData: IReportBody = JSON.parse(
        reportDataFromStorage as string
      );

      dispatch({ type: SET_DATE_IS_SELECTED, dateIsSelected: true });
      dispatch(
        reportTransportsInfo(navigate, parsedData, String(user?.company_id))
      );
    }
  }, [firstTransportId, user]);

  useEffect(() => {
    if (transports[0]?.isActive === undefined && !reportDataFromStorage) {
      dispatch({ type: SET_FIRST_NUMBER_IS_ACTIVE });
    }
  }, [transports[0]?.isActive]);

  useEffect(() => {
    const reportData = {
      transport: [firstTransportId],
      start: formatDateForRequest(new Date()),
      end: formatDateForRequest(tomorrow),
      report_type: HOURS,
    };

    if (reportData.transport[0] && !reportDataFromStorage) {
      dispatch(
        reportTransportsInfo(navigate, reportData, String(user?.company_id))
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
      dispatch({
        type: SET_SHORTENED_SELECTED_PERIOD,
        shortenedPeriodSelected,
      });
    }
  }, []);

  useRenderIfAuthenticated(setLoading);
};

export default useHomePageEffect;

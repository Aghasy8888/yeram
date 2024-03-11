import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import * as actionTypes from './companyActionTypes';
import request from '@/helpers/request';

const apiUrl = process.env.YERAM_APP_API_URL;

export function getCompanies (
  navigate: AppRouterInstance,
) {
  return (dispatch: TDispatchType) => {
    dispatch({ type: actionTypes.COMPANY_LOADING });

    request(navigate, `${apiUrl}/companies/`)
      .then((companies) => {
        
        dispatch({
          type: actionTypes.GET_COMPANIES_SUCCESS,
          companies,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR });
        console.log(err);
      });
  };
}

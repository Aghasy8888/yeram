import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import * as actionTypes from './transportActionTypes';
import request from '@/helpers/request';
import { createTransportQueryString } from '@/helpers/helpers_3';
import { handleDownload } from '@/helpers/helpers_4';
import {
  csvBlobType,
  csvForRequest,
  pdfBlobType,
  pdfForRequest,
  xlsBlobType,
  xlsForRequest,
} from '@/data/stepConstants';

const apiUrl = process.env.YERAM_APP_API_URL;

export function getTransports(
  navigate: AppRouterInstance,
  company_id: string,
  parsedData?: IReportBody,
  fromPersonalAccount?: boolean
) {
  return (dispatch: TDispatchType) => {
    dispatch({ type: actionTypes.TRANSPORT_LOADING });

    request(navigate, `${apiUrl}/companies/${company_id}/transport/`)
      .then((transports) => {
        dispatch({
          type: actionTypes.GET_TRANSPORTS_SUCCESS,
          transports,
          parsedData,
          fromPersonalAccount,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR });
        console.log(err);
      });
  };
}

export function reportTransportsInfo(
  navigate: AppRouterInstance,
  data: IReportBody,
  company_id: string
) {
  return (dispatch: TDispatchType) => {
    if (data.transport.length === 0) {
      dispatch({ type: actionTypes.ERROR });
      return;
    }
    const transportsQuery = createTransportQueryString(data.transport);
    const requestUrl = `${apiUrl}/companies/${company_id}/test/report/`;
    const query = `?type=${data.report_type}&start=${data.start}&end=${data.end}${transportsQuery}`;

    dispatch({ type: actionTypes.TRANSPORT_LOADING });

    request(navigate, requestUrl + query)
      .then((reports) => {
        if (!((reports as any) instanceof Array))
          throw new Error(
            'Transport report error: make sure you sent the correct request body with correct date formats.'
          );

        dispatch({
          type: actionTypes.REPORT_TRANSPORTS_SUCCESS,
          reports,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.ERROR });
      });
  };
}

export function reportDownload(
  navigate: AppRouterInstance,
  company_id: string,
  start: string,
  end: string,
  report_type: string,
  file_type: string,
  transport: string[]
) {
  return (dispatch: TDispatchType) => {
    dispatch({ type: actionTypes.TRANSPORT_LOADING });
    const url = `${apiUrl}/companies/${company_id}/report/download/`;    
    const transportsQuery = createTransportQueryString(transport);
    const query = `?type=${report_type}&start=${start}&end=${end}${transportsQuery}&file_type=${file_type}`;
    const requestUrl = url + query;

    request(navigate, requestUrl, 'POST')
      .then((reportsToDownload) => {
        switch (file_type) {
          case csvForRequest:
            handleDownload(reportsToDownload, csvBlobType, csvForRequest);

            break;
          case xlsForRequest:
            handleDownload(reportsToDownload, xlsBlobType, xlsForRequest);

            break;
          case pdfForRequest:
            handleDownload(reportsToDownload, pdfBlobType, pdfForRequest);

            break;
          default:
            break;
        }

        dispatch({
          type: actionTypes.DOWNLOAD_REPORTS_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR });
        console.log(err);
      });
  };
}

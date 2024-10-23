import {
  csvBlobType,
  csvForRequest,
  pdfBlobType,
  pdfForRequest,
  xlsBlobType,
  xlsForRequest,
} from '@/data/stepConstants';
import { createTransportQueryString } from '@/helpers/helpers_3';
import { handleDownload } from '@/helpers/helpers_4';
import request from '@/helpers/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.YERAM_APP_API_URL;

export const getTransports = createAsyncThunk(
  'transport/getTransports',
  async (
    {
      navigate,
      dispatch,
      company_id,
      fromPersonalAccount,
      parsedData,
    }: IGetTransportsArgs,
    { rejectWithValue }
  ) => {
    try {
      const transports: ITransport[] = await request(
        dispatch,
        navigate,
        `${apiUrl}/companies/${company_id}/transport/`
      );

      return { transports, parsedData, fromPersonalAccount };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during getTransports.');
    }
  }
);

export const reportTransportsInfo = createAsyncThunk(
  'transport/reportTransportsInfo',
  async (
    { navigate, company_id, data, from, dispatch }: IReportTransportsInfoArgs,
    { rejectWithValue }
  ) => {
    const transportsQuery = createTransportQueryString(data.transport);
    const requestUrl = `${apiUrl}/companies/${company_id}/test/report/`;
    const query = `?type=${data.report_type}&start=${data.start}&end=${data.end}${transportsQuery}`;

    try {
      const reports: IReportEntry[] = await request(
        dispatch,
        navigate,
        requestUrl + query
      );

      if (!((reports as any) instanceof Array))
        throw new Error(
          'Transport report error: make sure you sent the correct request body with correct date formats.'
        );

      return { reports, from, data, company_id };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during reportTransportsInfo.');
    }
  }
);

export const reportDownload = createAsyncThunk(
  'transport/reportDownload',
  async (
    {
      company_id,
      end,
      fileType,
      navigate,
      report_type,
      start,
      transport,
      dispatch
    }: IReportDownloadInfoArgs,
    { rejectWithValue }
  ) => {
    const url = `${apiUrl}/companies/${company_id}/report/download/`;
    const transportsQuery = createTransportQueryString(transport);
    const query = `?type=${report_type}&start=${start}&end=${end}${transportsQuery}&file_type=${fileType}`;
    const requestUrl = url + query;

    try {
      const reportsToDownload = await request(dispatch, navigate, requestUrl, 'POST');

      switch (fileType) {
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
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during reportDownload.');
    }
  }
);

export const editTransport = createAsyncThunk(
  'transport/editTransport',
  async (
    { navigate, company_id, requestBody, transport_id, dispatch }: IEditTransportInfoArgs,
    { rejectWithValue }
  ) => {
    
    try {
      const editedTransport: ITransportFromBack = await request(
        dispatch,
        navigate,
        `${apiUrl}/companies/${company_id}/transport/${transport_id}`,
        'PATCH',
        requestBody
      );

      return { editedTransport };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during editTransport.');
    }
  }
);

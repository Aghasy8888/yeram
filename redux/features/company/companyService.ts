import request from '@/helpers/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.YERAM_APP_API_URL;

export const getOwnCompany = createAsyncThunk(
  'company/getOwnCompany',
  async ({ companyId, navigate, dispatch }: IGetOwnCompanyArgs, { rejectWithValue }) => {
    try {
      const ownCompany: ICompany = await request(
        dispatch,
        navigate,
        `${apiUrl}/companies/${companyId}`
      );

      return { ownCompany };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during getOwnCompany.');
    }
  }
);

interface IGetCompaniesArgs extends INavigateArg, IDispatchArg {

}

export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async ({ navigate, dispatch}: IGetCompaniesArgs, { rejectWithValue }) => {
    try {
      const companies: ICompany[] = await request(
        dispatch,
        navigate,
        `${apiUrl}/companies/`
      );

      return { companies };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during getCompanies.');
    }
  }
);

export const editCompany = createAsyncThunk(
  'company/editCompany',
  async (
    { navigate, requestBody, userRole, dispatch }: IEditCompanyArgs,
    { rejectWithValue }
  ) => {
    localStorage.setItem('editCompanyRequestBody', JSON.stringify(requestBody));

    try {
      const editedCompany: ICompany = await request(
        dispatch,
        navigate,
        `${apiUrl}/companies/${requestBody.id}`,
        'PATCH',
        requestBody
      );

      if (!editedCompany.phone?.includes('+7')) {
        throw new Error('Make sure you enter a valid phone number');
      }

      localStorage.setItem('companyInDetails', JSON.stringify(editedCompany));

      return { editedCompany, userRole };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during editCompany.');
    }
  }
);

export const getCompanyUsers = createAsyncThunk(
  'company/getCompanyUsers',
  async (
    { navigate, companyId, dispatch }: IGetCompanyUsersArgs,
    { rejectWithValue }
  ) => {
    try {
      const companyUsers: IUserInfo[] = await request(
        dispatch,
        navigate,
        `${apiUrl}/companies/${companyId}/staff/`
      );

      return { companyUsers };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during getCompanyUsers.');
    }
  }
);

import { LOGIN_ERROR_MESSAGE } from '@/data/stepConstants';
import { loginRequest, registerRequest } from '@/helpers/auth';
import request from '@/helpers/request';
import { AppDispatch } from '@/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const apiUrl = process.env.YERAM_APP_API_URL;

export const register = createAsyncThunk(
  'auth/register',
  async ({ data, navigate }: IRegisterArgs, { rejectWithValue }) => {
    try {
      const response: IToken = await registerRequest(data);

      return { response, navigate };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during register.');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ data, navigate }: ILoginArgs, { rejectWithValue }) => {
    try {
      const token: IToken = await loginRequest(data);

      return { token };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue({ errorMessage: LOGIN_ERROR_MESSAGE });
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (
    { navigate, dispatch }: { navigate: AppRouterInstance, dispatch: AppDispatch },
    { rejectWithValue }
  ) => {
    try {
      const userInfo: IUserInfo = await request(dispatch, navigate, `${apiUrl}/users/me`);

      return { userInfo };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during getUserInfo.');
    }
  }
);

export const setUserRole = createAsyncThunk(
  'auth/setUserRole',
  async (
    { navigate, data, username, dispatch }: ISetUserRoleArgs,
    { rejectWithValue }
  ) => {
    try {
      const editedUserRoles: IEditedUserRoles = await request(
        dispatch,
        navigate,
        `${apiUrl}/set-roles/${username}/`,
        'PUT',
        data
      );

      return { editedUserRoles };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during setUserRole.');
    }
  }
);

export interface IAddUserBody {
  username: string;
  email: string;
  id: number;
  company: string;
  password: string;
  roles: IRoleInfo;
  first_name?: string;
  last_name?: string;
  middle_name?: string | null;
}

interface IAddUserArgs {
  data: IAddUserBody;
  navigate: AppRouterInstance;
  dispatch: AppDispatch;
}

export const addUser = createAsyncThunk(
  'auth/addUser',
  async (
    { navigate, data, dispatch }: IAddUserArgs,
    { rejectWithValue }
  ) => {
    try {
      const user: IUserInfo = await request(
        dispatch,
        navigate,
        `${apiUrl}/users/`,
        'POST',
        data
      );

      return { user };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during addUser.');
    }
  }
);
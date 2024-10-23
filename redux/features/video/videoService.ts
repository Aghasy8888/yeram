import request from '@/helpers/request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const apiUrl = process.env.YERAM_APP_API_URL;

interface IGetVideosInfoArgs extends IDispatchArg {
  navigate: AppRouterInstance;
  data: IVideoRequestBody;
  user: {};
  page: number;
}

export const getVideos = createAsyncThunk(
  'transport/getVideos',
  async (
    { navigate, data, user, page, dispatch }: IGetVideosInfoArgs,
    { rejectWithValue }
  ) => {
    const requestUrl = `${apiUrl}/videos/?start=${data.start}&end=${data.end}&transport=${data.transport}&page=${page}`;

    try {
      const videosAndJwt: IGetVideosResponse = await request(
        dispatch,
        navigate,
        requestUrl
      );

      return {
        jwt: videosAndJwt.jwt,
        videos: videosAndJwt.videos,
        user: user as IUserInfo,
      };
    } catch (error) {
      console.log('Error: ', error);
      return rejectWithValue('Error occurred during getVideos.');
    }
  }
);

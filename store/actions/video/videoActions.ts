import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import * as actionTypes from './videoActionTypes';
import request from '@/helpers/request';
import { ERROR } from '../transport/transportActionTypes';

const apiUrl = process.env.YERAM_APP_API_URL;

export function getVideos(
  navigate: AppRouterInstance,
  data: IVideoRequestBody,
  user: {},
  page: number = 1,
  
) {
  return (dispatch: TDispatchType) => {
    dispatch({ type: actionTypes.VIDEO_LOADING });
    const requestUrl = `${apiUrl}/videos/?start=${data.start}&end=${data.end}&transport=${data.transport}&page=${page}`;
    
    
    request(
      navigate,
      requestUrl,
    )
      .then((videosAndJwt) => {

        dispatch({
          type: actionTypes.GET_VIDEOS_SUCCESS,
          videos: videosAndJwt.videos,
          jwt: videosAndJwt.jwt,
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ERROR });
      });
  };
}

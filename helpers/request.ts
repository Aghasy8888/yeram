import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getJWT } from './auth';
import {
  VIDEOS,
} from '@/data/stepConstants';
import { redirect } from 'next/navigation';
import { AppDispatch } from '@/redux/store';

const defaultError = { message: 'Something went wrong!' };

async function request(
  dispatch: AppDispatch,
  navigate: AppRouterInstance,
  url: string,
  method = 'GET',
  body?: { file_type?: string } | {}
) {  
  const jwt = await getJWT(navigate, dispatch);
  const splittedUrl = url.split('/');
  const splittedUrlLength = splittedUrl.length;
  const isVideoRequest = splittedUrl[splittedUrlLength - 2] === VIDEOS;

  if (!jwt) {
    return Promise.reject(defaultError);
  }

  const config: RequestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const downloadStr = url.split('companies')[1]?.split('/')[3];
  const isReportDownloadRequest = downloadStr === 'download';

  // console.log('body', body);
  // console.log('url in fetch', url);

  return fetch(url, config)
    .then((response) => {
      // console.log('response', response.ok);

      if (!response.ok) {
        if (response.status === 503) {
          console.error('Service is unavailable. Please try again later.');
        }

        redirect('/siteIsInTechSupport');        
      }

      if (isReportDownloadRequest) {
        return response.blob();
      }

      return response.json();
    })
    .then((result) => {
      // console.log('result', result);

      if (result.detail) {
        throw new Error(result.detail);
      }

      if (isVideoRequest) {
        return {
          videos: result,
          jwt,
        };
      }

      return result;
    })
    .catch((error) => {
      throw error;
    });
}

export default request;

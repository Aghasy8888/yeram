import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import redirect from './redirect';
import { AppDispatch } from '@/redux/store';
import { resetAllState } from '@/redux/features/globalActions';

const apiUrl = process.env.YERAM_APP_API_URL;

export function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  return true;
}

export function registerRequest(data: IRegisterData) {
  return request(data, 'register');
}

export function loginRequest(data: ILoginData) {
  return request(data, 'login');
}

function request(data: {}, type: string) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  let url: string = '';

  if (type === 'login') {
    url = `${apiUrl}/auth/jwt/create/`;
  } else if (type === 'register') {
    url = `${apiUrl}/users/`;
  }

  return fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 500) {
          redirect('/siteIsInTechSupport');
        }
        console.log('Error:', response.status);
        
        
        throw new Error('Network response was not ok.');
      }

      return response.json();
    })
    .then((result) => {
      if (result.detail) {
        return { error: result.detail };
      }
      return result;
    });
}

export function getJWT(navigate: AppRouterInstance, dispatch: AppDispatch,) {
  const token = localStorage.getItem('token');
  if (!token) {
    logout(navigate, dispatch);
    return null;
  }

  const parsed: IToken = JSON.parse(token);

  const decoded = jwtDecode<JwtPayload>(parsed.access);

  if (decoded.exp !== undefined && decoded.exp - Date.now() / 1000 < 60) {
    return fetch(`${apiUrl}/user/${decoded.sub}/token`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: parsed.refresh }),
    })
      .then((response) => response.json() as Promise<NewTokenResponse>)
      .then((newToken) => {
        if (newToken.error) {
          throw newToken.error;
        }
        saveToken(newToken);
        return newToken.access;
      })
      .catch(() => {
        logout(navigate, dispatch);
        return null;
      });
  }

  return Promise.resolve(parsed.access);
}

export function logout(navigate: AppRouterInstance, dispatch: AppDispatch) {
  dispatch(resetAllState());
  removeToken();
  removeReportData();
  removeEditCompanyBody();
  removeCompanyInDetails();

  navigate.push('/login');
}

export function removeReportData() {
  localStorage.removeItem('reportData');
}

export function removeCompanyInDetails() {
  localStorage.removeItem('companyInDetails');
}

export function removeEditCompanyBody() {
  localStorage.removeItem('editCompanyRequestBody');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function saveToken(data: NewTokenResponse) {
  localStorage.setItem('token', JSON.stringify(data));
}

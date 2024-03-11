import { LOGOUT_SUCCESS } from '@/store/actions/user/userActionTypes';
import { store } from '@/store/store';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { redirect } from 'next/navigation';

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
    .then((response) => response.json())
    .then((result) => {
      if (result.detail) {
        throw new Error(result.detail);
      }
      return result;
    });
}

export function getJWT(navigate: AppRouterInstance) {
  const token = localStorage.getItem('token');
  if (!token) {
    logout(navigate);
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
        logout(navigate);
        return null;
      });
  }

  return Promise.resolve(parsed.access);
}

export function logout(navigate: AppRouterInstance) {
  store.dispatch({ type: LOGOUT_SUCCESS });
  removeToken();
  removeReportData();
  navigate.push('/login');
}

export function removeReportData() {
  localStorage.removeItem('reportData');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function saveToken(data: NewTokenResponse) {
  localStorage.setItem('token', JSON.stringify(data));
}

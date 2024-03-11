import request from '@/helpers/request';
import { loginRequest, registerRequest, saveToken } from '../../../helpers/auth';
import * as actionTypes from './userActionTypes';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
const apiUrl = process.env.YERAM_APP_API_URL;

export function register(data: IRegisterData, navigate: AppRouterInstance) {
    return (dispatch: TDispatchType) => {
        dispatch({type: actionTypes.AUTH_LOADING});

        registerRequest(data)
        .then((response: IRegisterResponse) => {
            dispatch({type: actionTypes.REGISTER_SUCCESS});
            navigate.push('/login'); 
        })
        .catch(error => {
            console.log(error);
            dispatch({type: actionTypes.AUTH_ERROR});
        })
    }
}

export function login(data: ILoginData, navigate: AppRouterInstance) {
    return (dispatch: TDispatchType) => {
        dispatch({type: actionTypes.AUTH_LOADING});

        loginRequest(data)
        .then((token: IToken) => {
            saveToken(token);
            dispatch({type: actionTypes.LOGIN_SUCCESS});
            navigate.push("/");
        })
        .catch((error: Error) => {
            console.log(error.message);
            dispatch({type: actionTypes.AUTH_ERROR});
        })
    }
}

export function getUserInfo(navigate: AppRouterInstance) {    
    return (dispatch: TDispatchType) => {
        dispatch({type: actionTypes.AUTH_LOADING});

        request(navigate, `${apiUrl}/users/me`)
        .then(data => {
            dispatch({type: actionTypes.GET_USER_INFO_SUCCESS, userInfo: data})
        })
        .catch((error: Error) => {
            console.log(error.message);
            dispatch({type: actionTypes.AUTH_ERROR})
        })
    }
}


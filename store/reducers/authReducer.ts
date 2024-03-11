import { ADMIN, MODERATOR, SUPER_ADMIN, USER } from '@/data/stepConstants';
import * as actionTypes from '../actions/user/userActionTypes';
import { getUserRole } from '@/helpers/helpers_4';

const defaultState: IAuthDefaultState = {
  isAuthenticated: false,
  userRole: USER,
  loading: false,
  userInfo: null,
};

const authReducer = (
  state: IAuthDefaultState = defaultState,
  action: IAuthAction
): IAuthDefaultState => {
  const loadingState: IAuthDefaultState = {
    ...state,
    loading: true,
  };

  switch (action.type) {
    case actionTypes.AUTH_LOADING:
      return loadingState;

    case actionTypes.AUTH_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.AUTH_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...defaultState,
      };
    }

    case actionTypes.USER_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true,
      };
    }

    case actionTypes.USER_NOT_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }

    case actionTypes.GET_USER_INFO_SUCCESS: {
      let userRole = getUserRole(action.userInfo?.roles as IRoleInfo);
      if (action.userInfo?.is_superuser) userRole = SUPER_ADMIN;

      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
        userRole: userRole as string,
      };
    }

    default:
      return state;
  }
};

export default authReducer;

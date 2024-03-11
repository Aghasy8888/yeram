import * as actionTypes from '../actions/admin/adminActionTypes';

const defaultState: IAdminDefaultState = {
  loading: false,
};

const adminReducer = (
  state: IAdminDefaultState = defaultState,
  action: IAdminAction
): IAdminDefaultState => {
  const loadingState: IAdminDefaultState = {
    ...state,
    loading: true,
  };

  switch (action.type) {
    case actionTypes.ADMIN_LOADING:
      return loadingState;

    case actionTypes.ADMIN_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.ADMIN_ACTION_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default adminReducer;

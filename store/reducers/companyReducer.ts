import * as actionTypes from '../actions/company/companyActionTypes';
import { LOGOUT_SUCCESS, AUTH_LOADING } from '../actions/user/userActionTypes';

const defaultState: ICompanyDefaultState = {
  loading: false,
  companies: [],
  activeCompanies: [],
  unActiveCompanies: [],
  companyInDetails: null,
  activeTransports: [],
  unActiveTransports: [],
};

const companyReducer = (state = defaultState, action: ICompanyAction) => {
  const loadingState = {
    ...state,
    loading: true,
  };

  switch (action.type) {
    case LOGOUT_SUCCESS:
      return defaultState;

    case AUTH_LOADING: {
      return {
        ...state,
      };
    }

    case actionTypes.COMPANY_LOADING:
      return loadingState;

    case actionTypes.ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.GET_COMPANIES_SUCCESS: {
      const activeCompanies = action.companies?.filter(
        (company) => company.isactive
      );
      const unActiveCompanies = action.companies?.filter(
        (company) => !company.isactive
      );

      return {
        ...state,
        loading: false,
        companies: action.companies,
        activeCompanies,
        unActiveCompanies,
      };
    }

    case actionTypes.SET_COMPANY_IN_DETAILS: {
      const activeTransports = action.companyInDetails.transports.filter(
        (transport) => transport.isactive
      );
      const unActiveTransports = action.companyInDetails.transports.filter(
        (transport) => !transport.isactive
      );

      return {
        ...state,
        loading: false,
        companyInDetails: action.companyInDetails,
        activeTransports,
        unActiveTransports,
      };
    }

    default:
      return state;
  }
};

export default companyReducer;

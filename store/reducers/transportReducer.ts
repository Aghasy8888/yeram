import { getTotalReportInfo } from '@/helpers/helpers_2';
import * as actionTypes from '../actions/transport/transportActionTypes';
import { LOGOUT_SUCCESS, AUTH_LOADING } from '../actions/user/userActionTypes';
import { getDefaultReportType } from '@/helpers/helpers_3';
import {
  isNotFutureDate,
  sortTransportsByGosNumber,
} from '@/helpers/helpers_4';
import { DAYS, HOURS } from '@/data/stepConstants';

const defaultState: ITransportDefaultState = {
  transports: [],
  activeTransports: [],
  submittedTransports: [],
  loading: false,
  company_id: '',
  report_type: getDefaultReportType(),
  reports: [],
};

const transportReducer = (state = defaultState, action: ITransportAction) => {
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

    case actionTypes.TRANSPORT_LOADING:
      return loadingState;

    case actionTypes.ERROR:
    case actionTypes.SET_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.GET_TRANSPORTS_SUCCESS: {
      let activeTransports: ITransport[] | undefined = [];
      const sortedTransports = sortTransportsByGosNumber(
        action.transports as ITransport[]
      );
      if (action.parsedData) {
        sortedTransports?.forEach((transport) => {
          if (action.parsedData?.transport.includes(transport.id)) {
            transport.isActive = true;
          } else {
            transport.isActive = false;
          }
        });

        activeTransports = sortedTransports?.filter(
          (transport) => transport.isActive
        );
      }

      return {
        ...state,
        loading: action.fromPersonalAccount ? false : state.loading,
        transports: sortedTransports,
        activeTransports: action.parsedData
          ? activeTransports
          : sortedTransports[0]
          ? [sortedTransports[0]]
          : [],
      };
    }

    case actionTypes.GET_COMPANY_ID: {
      return {
        ...state,
        loading: false,
        transports: action.transports,
      };
    }

    case actionTypes.SET_FIRST_NUMBER_IS_ACTIVE: {
      const updatedFirstTransport = {
        ...state.transports[0],
        isActive: true,
      };

      const updatedTransports = [
        ...state.transports.slice(0, 0),
        updatedFirstTransport,
        ...state.transports.slice(1),
      ];

      return {
        ...state,
        transports: updatedTransports,
        submittedTransports: [updatedTransports[0]],
      };
    }

    case actionTypes.SET_NUMBER_IS_ACTIVE: {
      const index = state.transports.findIndex(
        (transport) => transport.id === action.transportId
      );

      if (index !== -1) {
        const updatedTransport = {
          ...state.transports[index],
          isActive: state.transports[index]
            ? !state.transports[index]?.isActive
            : true,
        };

        const updatedTransports = [
          ...state.transports.slice(0, index),
          updatedTransport,
          ...state.transports.slice(index + 1),
        ];

        const updatedActiveTransports = updatedTransports.filter(
          (transport) => transport.isActive
        );

        return {
          ...state,
          loading: false,
          transports: updatedTransports,
          activeTransports: updatedActiveTransports,
        };
      }

      return state;
    }

    case actionTypes.REPORT_TRANSPORTS_SUCCESS: {
      const reportType = action.data.report_type;
      const reportsWithoutFutureDays = action.reports?.filter((report) =>
        isNotFutureDate(report.time, action.data.end)
      );
      const activeTransports = state.transports.filter(
        (transport) => transport.isActive
      );

      const updatedActiveTransports = activeTransports.map((transport) => {
        const transportReport = action.reports?.filter(
          (report) => report.transport_id === transport.id
        );

        const reportDetails: reportDetails = {
          totalCameIn: getTotalReportInfo(transportReport).totalCameIn,
          totalCameOut: getTotalReportInfo(transportReport).totalCameOut,
        };

        return {
          ...transport,
          report: reportDetails,
        };
      });

      return {
        ...state,
        loading: false,
        activeTransports: updatedActiveTransports,
        submittedTransports: updatedActiveTransports,
        report_type: reportType,
        reports: action.reports,
      };
    }

    case actionTypes.DOWNLOAD_REPORTS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default transportReducer;

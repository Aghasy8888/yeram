import { hour } from '@/data/stepConstants';
import * as actionTypes from '../actions/other/otherActionTypes';
import hourPeriods from '@/data/hourPeriods';

const defaultState: IOtherDefaultState = {
  dateIsSelected: false,
  periods: hourPeriods,
  shortenedPeriodSelected: hour.slice(0, 3),
  searchText: '',
};

const otherReducer = (state = defaultState, action: IOtherAction) => {
  switch (action.type) {
    case actionTypes.SET_DATE_IS_SELECTED: {
      return {
        ...state,
        dateIsSelected: action.dateIsSelected,
      };
    }

    case actionTypes.SET_SHORTENED_SELECTED_PERIOD: {
      return {
        ...state,
        shortenedPeriodSelected: action.shortenedPeriodSelected,
      };
    }

    case actionTypes.SET_SEARCH: {
      return {
        ...state,
        searchText: action.searchText?.toUpperCase(),
      };
    }

    default:
      return state;
  }
};

export default otherReducer;

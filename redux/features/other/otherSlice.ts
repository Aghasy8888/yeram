import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import hourPeriods from '@/data/hourPeriods';
import { hour } from '@/data/stepConstants';
import { resetAllState } from '../globalActions';

// Initial state
const initialState: IOtherDefaultState = {
  periods: hourPeriods,
  shortenedPeriodSelected: hour.slice(0, 3),
  searchText: '',
  editCompanyBtnDisabled: false,
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setEditCompanyBtnDisabled(state, { payload }) {
      state.editCompanyBtnDisabled = payload;
    },
    setSearch(state, { payload }) {
      state.searchText = payload?.toUpperCase();
    },
    setShortenedPeriodSelected(state, { payload }) {
      state.shortenedPeriodSelected = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllState, () => initialState);
  },
});

export const {
  setEditCompanyBtnDisabled,
  setSearch,
  setShortenedPeriodSelected,
} = otherSlice.actions;

export const selectEditCompanyBtnDisabled = (state: RootState) =>
  state.otherReducer.editCompanyBtnDisabled;
export const selectSearchText = (state: RootState) =>
  state.otherReducer.searchText;
export const selectShortenedPeriodSelected = (state: RootState) =>
  state.otherReducer.shortenedPeriodSelected;

export default otherSlice.reducer;

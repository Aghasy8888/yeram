import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import {
  editTransport,
  getTransports,
  reportDownload,
  reportTransportsInfo,
} from './transportService';
import { sortTransportsByGosNumber } from '@/helpers/helpers_4';
import { getDefaultReportType } from '@/helpers/helpers_3';
import { PERSONAL_ACCOUNT } from '@/data/stepConstants';
import { getTotalReportInfo } from '@/helpers/helpers_2';
import { resetAllState } from '../globalActions';

const initialState: ITransportDefaultState = {
  transports: [],
  activeTransports: [],
  submittedTransports: [],
  loading: false,
  company: '',
  report_type: getDefaultReportType(),
  reports: [],
};

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    setTransportLoading(state, { payload }) {
      state.loading = payload;
    },
    setFirstNumberIsActive(state) {
      const updatedFirstTransport = {
        ...state.transports[0],
        isActive: true,
      };

      const updatedTransports = [
        ...state.transports.slice(0, 0),
        updatedFirstTransport,
        ...state.transports.slice(1),
      ];

      state.transports = updatedTransports;
      state.submittedTransports = [updatedTransports[0]];
    },
    setNumberIsActive(state, { payload }: { payload: string }) {
      const index = state.transports.findIndex(
        (transport) => transport.id === payload
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

        state.loading = false;
        state.transports = updatedTransports;
        state.activeTransports = updatedActiveTransports;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllState, () => initialState)
      .addCase(editTransport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reportDownload.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        reportTransportsInfo.fulfilled,
        (state, { payload }: { payload: IReportTransportsPayload }) => {
          const { company_id, data, from, reports } = payload;

          if (data.transport.length === 0) {
            state.loading = false;
            return;
          }

          switch (from) {
            case PERSONAL_ACCOUNT:
              state.loading = false;
              break;
            default:
              const reportType = data.report_type;

              const activeTransports = state.transports.filter(
                (transport) => transport.isActive
              );

              const updatedActiveTransports = activeTransports.map(
                (transport) => {
                  const transportReport = reports?.filter(
                    (report) => report.transport_id === transport.id
                  );

                  const reportDetails: reportDetails = {
                    totalCameIn:
                      getTotalReportInfo(transportReport).totalCameIn,
                    totalCameOut:
                      getTotalReportInfo(transportReport).totalCameOut,
                  };

                  return {
                    ...transport,
                    report: reportDetails,
                  };
                }
              );

              const serverActiveTransports = updatedActiveTransports.filter(
                (t) => t.isactive
              );

              state.loading = false;
              state.activeTransports = updatedActiveTransports;
              state.submittedTransports = serverActiveTransports;
              state.report_type = reportType;
              state.reports = reports;
          }
        }
      )
      .addCase(
        getTransports.fulfilled,
        (state, { payload }: { payload: IGetTransportsPayload }) => {
          const { transports, fromPersonalAccount, parsedData } = payload;

          let activeTransports: ITransport[] | undefined = [];
          const sortedTransports = sortTransportsByGosNumber(
            transports as ITransport[]
          );
          if (parsedData) {
            sortedTransports?.forEach((transport) => {
              if (parsedData?.transport.includes(transport.id)) {
                transport.isActive = true;
              } else {
                transport.isActive = false;
              }
            });

            activeTransports = sortedTransports?.filter(
              (transport) => transport.isActive
            );
          }

          state.loading = fromPersonalAccount ? false : state.loading;
          state.transports = sortedTransports;
          state.activeTransports = parsedData
            ? activeTransports
            : sortedTransports[0]
            ? [sortedTransports[0]]
            : [];
        }
      )
      .addMatcher(
        (action) =>
          [
            getTransports.pending.type,
            reportTransportsInfo.pending.type,
            reportDownload.pending.type,
            editTransport.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getTransports.rejected.type,
            reportTransportsInfo.rejected.type,
            reportDownload.rejected.type,
            editTransport.rejected.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const {
  setFirstNumberIsActive,
  setNumberIsActive,
  setTransportLoading,
} = transportSlice.actions;

export const selectTransportLoading = (state: RootState) =>
  state.transportReducer.loading;
export const selectActiveTransports = (state: RootState) =>
  state.transportReducer.activeTransports;
export const selectCompanyId = (state: RootState) =>
  state.transportReducer.company;
export const selectReportType = (state: RootState) =>
  state.transportReducer.report_type;
export const selectReports = (state: RootState) =>
  state.transportReducer.reports;
export const selectSubmittedTransports = (state: RootState) =>
  state.transportReducer.submittedTransports;
export const selectTransports = (state: RootState) =>
  state.transportReducer.transports;

export default transportSlice.reducer;

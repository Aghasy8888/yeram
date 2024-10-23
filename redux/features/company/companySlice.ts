import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import {
  editCompany,
  getCompanies,
  getCompanyUsers,
  getOwnCompany,
} from './companyService';
import {
  ADMIN_PAGE,
  PERSONAL_ACCOUNT,
  SUPER_ADMIN,
} from '@/data/stepConstants';
import {
  editTransport,
  reportTransportsInfo,
} from '../transport/transportService';
import { getObjectsWithReports } from '@/helpers/helpers_5';
import { addUser } from '../auth/userService';
import { resetAllState } from '../globalActions';

const initialState: ICompanyDefaultState = {
  loading: false,
  companies: [],
  activeCompanies: [],
  unActiveCompanies: [],
  companyInDetails: null,
  activeTransports: [],
  unActiveTransports: [],
  ownCompany: {},
  companyUsers: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyInDetails(
      state,
      { payload }: { payload: ISetCompanyInDetailsPayload }
    ) {
      let companyInDetails = payload.companyInDetails;

      if (payload.userRole !== SUPER_ADMIN) {
        companyInDetails = state.ownCompany as ICompany;
      }

      const activeTransports = (companyInDetails as ICompany)?.transports;
      // const unActiveTransports = companyInDetails?.transports?.filter(
      //   (transport) => !transport.isactive
      // );

      state.loading = false;
      state.companyInDetails = companyInDetails;
      state.activeTransports = activeTransports
        ? activeTransports
        : state.activeTransports;
      //   state.unActiveTransports = unActiveTransports
      //     ? unActiveTransports
      //     : state.unActiveTransports;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllState, () => initialState)
      .addCase(
        editTransport.fulfilled,
        (state, { payload }: { payload: IEditTransportsPayload }) => {
          const {
            editedTransport: { time_table, isactive, islock, id },
          } = payload;

          const transportToEditIndex = state.activeTransports.findIndex(
            (transport) => transport?.id === id
          );

          if (transportToEditIndex !== -1) {
            const updatedTransports = state.activeTransports.map(
              (transport, index) => {
                if (index === transportToEditIndex) {
                  const updatedTransport: ITransportFromBack = {
                    ...transport,
                    time_table,
                    isactive,
                    islock,
                  };

                  return updatedTransport;
                }
                return transport;
              }
            );

            const targetTransport = (
              state.companyInDetails as ICompany
            ).transports.find((t) => t.id === id);

            if (targetTransport) {
              targetTransport.isactive = isactive;
              targetTransport.islock = islock;
            }

            state.activeTransports = updatedTransports;
          }
        }
      )
      .addCase(
        reportTransportsInfo.fulfilled,
        (state, { payload }: { payload: IReportTransportsPayload }) => {
          const { company_id, data, from, reports } = payload;

          switch (from) {
            case PERSONAL_ACCOUNT:
              const transportIndex: number | undefined = (
                state.companyInDetails as ICompany
              )?.transports.findIndex(
                (transport) => transport.id === reports[0].transport_id
              );

              if (transportIndex !== undefined && transportIndex >= 0) {
                const updatedTransports = getObjectsWithReports(
                  (state.companyInDetails as ICompany)?.transports,
                  transportIndex,
                  reports
                );

                const companyInDetails = {
                  ...state.companyInDetails,
                  transports: updatedTransports,
                };

                const activeTransports = companyInDetails?.transports;

                state.loading = false;
                state.companyInDetails = {
                  ...state.companyInDetails,
                  transports: updatedTransports,
                };
                state.activeTransports =
                  activeTransports as ITransportFromBack[];
              }
              break;
            case ADMIN_PAGE:
              const companyIndex: number | undefined =
                state.companies?.findIndex(
                  (company) => company.id === company_id
                );

              if (companyIndex !== undefined && companyIndex >= 0) {
                const updatedCompanies = getObjectsWithReports(
                  state.activeCompanies,
                  companyIndex,
                  reports
                );

                state.loading = false;
                state.activeCompanies = updatedCompanies
                  ? (updatedCompanies as ICompany[])
                  : [];
              }
              break;
          }
        }
      )
      .addCase(
        getCompanyUsers.fulfilled,
        (state, { payload }: { payload: ICompanyUsersPayload }) => {
          const { companyUsers } = payload;

          state.loading = false;
          state.companyUsers = companyUsers;
        }
      )
      .addCase(
        editCompany.fulfilled,
        (state, { payload }: { payload: IEditedCompanyPayload }) => {
          const { editedCompany, userRole } = payload;

          const ownCompany =
            userRole !== SUPER_ADMIN ? editedCompany : state.ownCompany;

          if (userRole === SUPER_ADMIN) {
            const companyToEditIndex = state.activeCompanies.findIndex(
              (c) => c.id === editedCompany.id
            );
            state.activeCompanies[companyToEditIndex] = editedCompany;
          }

          state.loading = false;
          state.companyInDetails = editedCompany;
          state.ownCompany = ownCompany;
        }
      )
      .addCase(
        getOwnCompany.fulfilled,
        (state, { payload }: { payload: IOwnCompanyPayload }) => {
          const { ownCompany } = payload;

          state.loading = false;
          state.ownCompany = ownCompany;
        }
      )
      .addCase(
        getCompanies.fulfilled,
        (state, { payload }: { payload: ICompaniesPayload }) => {
          const { companies } = payload;

          const activeCompanies = companies?.filter(
            (company) => company.isactive
          );
          const unActiveCompanies = companies?.filter(
            (company) => !company.isactive
          );

          state.loading = false;
          state.companies = companies;
          state.activeCompanies = activeCompanies;
          state.unActiveCompanies = unActiveCompanies;
        }
      )
      .addCase(
        addUser.fulfilled,
        (state, { payload }: { payload: IAddUserPayload }) => {
          const { user } = payload;

          state.companyUsers = [...state.companyUsers, user];
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            getOwnCompany.pending.type,
            getCompanies.pending.type,
            getCompanyUsers.pending.type,
            editCompany.pending.type,
            reportTransportsInfo.pending.type,
            addUser.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            getOwnCompany.rejected.type,
            getCompanies.rejected.type,
            getCompanyUsers.rejected.type,
            editCompany.rejected.type,
            reportTransportsInfo.rejected.type,
            addUser.rejected.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setCompanyInDetails } =
  companySlice.actions;

export const selectCompanyLoading = (state: RootState) =>
  state.companyReducer.loading;
export const selectCompanyInDetails = (state: RootState) =>
  state.companyReducer.companyInDetails;
export const selectCompanies = (state: RootState) =>
  state.companyReducer.companies;
export const selectActiveTransports = (state: RootState) =>
  state.companyReducer.activeTransports;
export const selectCompanyUsers = (state: RootState) =>
  state.companyReducer.companyUsers;
export const selectOwnCompany = (state: RootState) =>
  state.companyReducer.ownCompany;
export const selectUnActiveCompanies = (state: RootState) =>
  state.companyReducer.unActiveCompanies;
export const selectUnActiveTransports = (state: RootState) =>
  state.companyReducer.unActiveTransports;
export const selectActiveCompanies = (state: RootState) =>
  state.companyReducer.activeCompanies;

export default companySlice.reducer;

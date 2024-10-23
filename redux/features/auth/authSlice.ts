import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfo, login, register, setUserRole } from './userService';
import { RootState } from '@/redux/store';
import { saveToken } from '@/helpers/auth';
import { getUserRole } from '@/helpers/helpers_4';
import redirect from '@/helpers/redirect';
import { resetAllState } from '../globalActions';

const initialState: IAuthDefaultState = {
  isAuthenticated: false,
  userRole: '',
  loading: false,
  userInfo: null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth(state, { payload }) {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAllState, () => initialState)
      .addCase(
        login.fulfilled,
        (state, { payload }: { payload: ILoginPayload }) => {
          const { token } = payload;
          state.loading = false;

          if (token.error) {
            throw new Error(token.error);
          }

          saveToken(token);
          redirect('/');
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<ILoginErrorPayload | unknown>) => {
          state.errorMessage = (
            action.payload as ILoginErrorPayload
          ).errorMessage;
          state.loading = false;
        }
      )
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        redirect('/login');
      })
      .addCase(
        getUserInfo.fulfilled,
        (state, { payload }: { payload: IUserInfoPayload }) => {
          const { userInfo } = payload;
          let userRole = getUserRole(userInfo as IUserInfo);

          // userRole = MODERATOR;

          state.loading = false;
          state.userInfo = userInfo;
          state.userRole = userRole as string;
        }
      )
      .addCase(
        setUserRole.fulfilled,
        (state, { payload }: { payload: IUserRolesPayload }) => {
          const { editedUserRoles } = payload;

          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          [
            login.pending.type,
            register.pending.type,
            getUserInfo.pending.type,
            setUserRole.pending.type,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            register.rejected.type,
            getUserInfo.rejected.type,
            setUserRole.rejected.type,
          ].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setUserAuth } = authSlice.actions;

export const selectAuthLoading = (state: RootState) =>
  state.authReducer.loading;
export const selectAuthError = (state: RootState) =>
  state.authReducer.errorMessage;
export const selectUserInfo = (state: RootState) => state.authReducer.userInfo;
export const selectUserRole = (state: RootState) => state.authReducer.userRole;

export default authSlice.reducer;

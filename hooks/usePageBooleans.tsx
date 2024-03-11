import * as constants from '../app/(auth)/constants';
import useGetPage from './useGetPage';

interface IPageBooleans {
    resetOrRegisterBoolean: boolean;
    loginOrRegisterBoolean: boolean;
    loginOrResetBoolean: boolean;
  }

const usePageBooleans = (): IPageBooleans => {
  const page = useGetPage();

  const resetOrRegisterBoolean =
    page === constants.resetPassword || page === constants.register;
  const loginOrRegisterBoolean =
    page === constants.register || page === constants.login;
  const loginOrResetBoolean =
    page === constants.resetPassword || page === constants.login;

  return {
    resetOrRegisterBoolean,
    loginOrRegisterBoolean,
    loginOrResetBoolean,
  };
};

export default usePageBooleans;

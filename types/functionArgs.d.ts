interface ILoginArgs {
  data: ILoginData;
  navigate: AppRouterInstance;
}

interface IRegisterArgs {
  data: IRegisterData;
  navigate: AppRouterInstance;
}

interface ISetUserRoleArgs {
  data: ISetUserRoleBody;
  navigate: AppRouterInstance;
  dispatch: AppDispatch;
  username: string;
}

interface IGetOwnCompanyArgs {
  navigate: AppRouterInstance;
  dispatch: AppDispatch;
  companyId: string;
}

interface IGetCompanyUsersArgs extends IGetOwnCompanyArgs, IDispatchArg {}

interface IDispatchArg {
  dispatch: AppDispatch;
}

interface INavigateArg {
  navigate: AppRouterInstance;
}

interface IEditCompanyArgs extends IDispatchArg {
  navigate: AppRouterInstance;
  requestBody: IEditCompanyBody;
  userRole: string;
}

interface IReportTransportsInfoArgs extends IDispatchArg {
  navigate: AppRouterInstance;
  data: IReportBody;
  company_id: string;
  from?: string;
}

interface IGetTransportsArgs extends IDispatchArg {
  navigate: AppRouterInstance;
  company_id: string;
  parsedData?: IReportBody;
  fromPersonalAccount?: boolean;
}

interface IReportDownloadInfoArgs extends IDispatchArg {
  navigate: AppRouterInstance;
  company_id: string;
  start: string;
  end: string;
  report_type: string;
  fileType: string;
  transport: string[];
}

interface IEditTransportInfoArgs extends IDispatchArg {
  navigate: AppRouterInstance;
  company_id: string;
  transport_id: string;
  requestBody: ITransportBody;
}

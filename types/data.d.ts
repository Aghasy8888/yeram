// react-text-mask.d.ts
declare module 'react-text-mask' {
  export default any;
}

interface IRegisterResponse {
  email: string;
  username: string;
  id: number;
}

interface IColumnStyles {
  nameHeader: string;
  transported: string;
  control: string;
  empty: string;
}

interface ITransportTableColumnClasses {
  gosNumber: string;
  schedule: string;
  transported: string;
  control: string;
  connection: string;
}

interface IUserTableColumnClasses {
  fullName: string;
  email: string;
  role: string;
  connection: string;
}

interface ITransport {
  gos_number: string;
  id: string;
  isActive: boolean;
  report?: reportDetails;
  isactive: boolean;
}

interface ISchedule {
  end_time: string;
  start_time: string;
}

interface ITransportFromBack {
  channels: string;
  gos_number: string;
  id: string;
  islock: number;
  isactive: boolean;
  time_table: ISchedule[];
  confirmed: boolean;
  totalCameIns?: number;
}

interface ITransportBody {
  channels?: string;
  gos_number?: string;
  id?: string;
  isactive?: boolean;
  time_table?: ISchedule[];
  confirmed?: boolean;
}

interface IReportBody {
  transport: string[];
  start:
    | string
    | {
        forRequest: string;
        forShow?: string;
      }
    | undefined;
  end: string | undefined;
  report_type: string;
}

interface IEditFormValues {
  name: string;
  comment: string;
  phone: string;
  PSRN: string;
  RBOC: string;
  TIN: string;
  TRRC: string;
}

interface IReportSingle {
  time: string;
  exited: number;
  entered: number;
  transport_id?: string;
}
interface IReportEntry extends IReportSingle {
  transport_id: string;
  transport_plate: string;
}

interface IVideoRequestBody {
  transport: string;
  start: string;
  end: string;
}

interface IErrorResponse {
  detail: string;
  code: string;
}

type TTransports = ITransport[] | IErrorResponse;

interface IToken {
  access: string;
  refresh: string;
  detail?: string;
  error?: string;
}

interface IDecoded {
  token_type: string;
  exp: 1701965023;
  iat: 1701705823;
  jti: string;
  user_id: number;
}

interface NewTokenResponse {
  access: string;
  error?: string;
}

interface RequestOptions {
  method: string;
  headers: {
    'Content-Type': string;
    Authorization: string;
    page_size?: string;
    page?: string;
  };
  body?: string;
}

interface INavigate {
  navigate: AppRouterInstance;
}

interface ILoginPayload {
  token: IToken;
}

interface ILoginErrorPayload {
  errorMessage: string;
}

interface IRegisterPayload extends INavigate {
  response: unknown;
}

interface IAddUserPayload {
  user: IUserInfo;
}

interface IUserInfoPayload {
  userInfo: IUserInfo;
}

interface IUserRolesPayload {
  editedUserRoles: IEditedUserRoles;
}

interface IOwnCompanyPayload {
  ownCompany: ICompany;
}

interface IEditedCompanyPayload {
  editedCompany: ICompany;
  userRole: string;
}

interface ICompanyUsersPayload {
  companyUsers: IUserInfo[];
}

interface IGetTransportsPayload {
  transports: ITransport[];
  parsedData?: IReportBody;
  fromPersonalAccount?: boolean;
}

interface IReportTransportsPayload {
  reports: IReportEntry[];
  from: string | undefined;
  data: IReportBody;
  company_id: string;
}

interface IGetVideosPayload extends IGetVideosResponse {
  user: IUserInfo;
} 

interface IEditTransportsPayload {
  editedTransport: ITransportFromBack;
}

interface ISetCompanyInDetailsPayload {
  userRole: string;
  companyInDetails: ICompany | null | {};
}

interface ICompaniesPayload {
  companies: ICompany[];
}

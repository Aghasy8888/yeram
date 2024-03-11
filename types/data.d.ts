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
}

interface ITransportFromBack {
  channels: string;
  gos_number: string;
  id: string;
  isactive: boolean;
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
  end: string;
  report_type: string;
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

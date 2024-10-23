interface ITimeState {
  shiftStart: string;
  shiftEnd: string;
  startTimeError: string | null;
  endTimeError: string | null;
}

interface FinanceState {
  income: number;
  salary: number;
}

interface ISetUserRoleBody {
  is_owner: boolean;
  staff_access: boolean;
  company_access: boolean;
  devices_access: boolean;
}

interface IRoleInfo extends ISetUserRoleBody {
  user: number;
}

interface IUserInfo {
  id: number;
  email: string;
  company: number | null;
  company_name: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  phone: string | null;
  username: string;
  session_id: string;
  is_superuser: boolean;
  roles: IRoleInfo;
}

interface IAuthDefaultState {
  userRole: string;
  isAuthenticated: boolean;
  loading: boolean;
  userInfo: null | IUserInfo | undefined;
  errorMessage: string | null;
}

interface IAuthAction {
  type: string;
  userInfo?: IUserInfo;
  editedUserRoles: IEditedUserRoles;
  errorMessage: string | null;
}

interface IVideoReport {
  count: number;
  results: {
    link: string;
    dt: string;
  }[];
}

interface ICalculationResultAndSetter {
  calculationResult: ICalculationResult;
  setCalculationResult: Dispatch<SetStateAction<ICalculationResult>>;
}

interface IVideoDefaultState {
  loading: boolean;
  videos: IVideoReport;
}
interface ITransportDefaultState {
  transports: ITransport[];
  loading: boolean;
  company: string;
  activeTransports: ITransport[];
  submittedTransports: ITransport[];
  report_type: string;
  reports: IReportEntry[] | [];
}

interface ITableOrDiagram {
  tableIcon: string;
  diagramIcon: string;
}

interface IPeriodSelected {
  todayIsSelected: boolean;
  yesterdayIsSelected: boolean;
  weekIsSelected: boolean;
  monthIsSelected: boolean;
}

interface IPeriodSelectedState {
  periodSelected: IPeriodSelected;
  setPeriodSelected: TSetPeriodSelected;
}

interface IStartAndEndDate {
  start: string;
  end: string;
}

interface IAuthState {
  loading: boolean;
  userInfo: IUserInfo | null;
}

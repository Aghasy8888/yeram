interface IDiagramIcons {
  diagramIcon: string;
  diagramIconActive: string;
}

interface IImage {
  src: string;
  width: number;
  height: number;
}
interface ISelectedPeriodIcon extends IImage {
  name: string;
}

interface IVideo extends IImage {
  carNumber: string;
  dateInfo: string;
  downloadImg: IImage;
}

interface ICarNumbers {
  gos_number: string;
  id: string;
  isActive: boolean;
  hours: string;
  entered: number;
  exited: number;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ILoginData {
  username: string;
  password: string;
}

interface IRegisterData extends ILoginData {
  email: string;
}

interface ISingleReport {
  camein: number;
  cameout: number;
  date?: string;
}

interface ReportData {
  [hour: string]: ISingleReport;
}

interface TotalReportInfo {
  totalCameIn: number | undefined;
  totalCameOut: number | undefined;
}
interface reportDetails extends TotalReportInfo {
  [key: string]: ISingleReport[] | number | undefined;
}

interface IEditedUserRoles extends ISetUserRoleBody {
  user: number;
}

interface IReport {
  report: ReportData;
  transport: string;
  transport_plate: string;
}

interface IOtherDefaultState {
  shortenedPeriodSelected: string;
  periods: string[];
  searchText: string;
  editCompanyBtnDisabled: boolean;
}

interface IOtherAction extends IOtherDefaultState {
  type: string;
}

interface ICalculationResult {
  income: number;
  salary: number;
  profit: number;
}

interface IVideoAction extends IGetVideosResponse {
  type: string;
  user: IUserInfo;
}

interface IGetVideosResponse {
  videos: IVideoReport;
  jwt: string;
}

interface IAdminDefaultState {
  loading: boolean;
}

interface IAdminAction {
  type: string;
}

type TMouseEvent = MouseEvent<HTMLLabelElement, MouseEvent>;
type TName = keyof ICompany | keyof ITransportFromBack | keyof IUserInfo;
interface ITransportAction {
  parsedData?: IReportBody;
  type: string;
  transports?: ITransport[];
  transportId?: string;
  reports?: IReportEntry[];
  reportData?: IReportBody;
  reportType?: string;
  fromPersonalAccount?: boolean;
  data: IReportBody;
  submittedTransports?: ITransport[];
  reportsToDownload: string;
}

interface IAction {
  type: string;
}

type TDispatch = ThunkDispatch<TMainReducer, undefined, IAction>;

interface IReportTypeAndExample {
  reportType: string;
  reportExample: ISingleReport[];
}

declare module 'redux-logger';
declare module 'react-datepicker';

interface ITransportInPersonalAccount {
  gos_number: string;
  id: string;
  isactive: boolean;
  schedule: string;
}

interface IUserInPersonalAccount {
  fullName: string;
  email: string;
  role: string;
  isactive: boolean;
}

interface IStepOption {
  value: string;
  label: string;
}

interface IDropDownOption {
  value: string;
  label: string;
}

interface IWaitingTransport {
  gos_number: string;
  connectionDate: string;
}

type TKeyboardEvent = KeyboardEvent<HTMLDivElement>;

interface ICompany extends IEditCompanyBody {
  transports: ITransportFromBack[];
  totalCameIns?: number;
}

interface IEditCompanyBody {
  id: string;
  isactive?: boolean;
  name?: string;
  comment?: string;
  phone?: string;
  PSRN?: number;
  RBOC?: number;
  TIN?: number;
  TRRC?: number;
}

interface ICompanyActionAndState {
  companies: ICompany[];
  companyInDetails: ICompany | null | {};
  ownCompany: ICompany | {};
  companyUsers: IUserInfo[] | [];
}

interface ICompanyAction extends ICompanyActionAndState {
  type: string;
  userRole: string;
  editedCompany: ICompany;
  reports: IReportEntry[];
  company: string;
  editedTransport: ITransportFromBack;
}
interface ICompanyDefaultState extends ICompanyActionAndState {
  loading: boolean;
  activeCompanies: ICompany[];
  unActiveCompanies: ICompany[];
  activeTransports: ITransportFromBack[];
  unActiveTransports: ITransportFromBack[];
}

type TDateForRequest = {
  forRequest: string;
  forShow?: string | undefined;
};

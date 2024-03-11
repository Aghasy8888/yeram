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

interface IAuthAction {
  type: string;
  userInfo?: IUserInfo;
}

interface IReport {
  report: ReportData;
  transport: string;
  transport_plate: string;
}

interface IOtherAction {
  type: string;
  dateIsSelected?: boolean;
  shortenedPeriodSelected?: string;
  periods?: string[];
  searchText?: string;
}

interface ICalculationResult {
  income: number;
  salary: number;
  profit: number;
}

interface IVideoAction {
  type: string;
  videos: IVideoReport;
  jwt: string;
  user: IUserInfo;
}

interface IAdminDefaultState {
  loading: boolean;
}

interface IAdminAction {
  type: string;
}

type TMouseEvent = MouseEvent<HTMLLabelElement, MouseEvent>

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

type TKeyboardEvent = KeyboardEvent<HTMLDivElement>

interface ICompany {
  id: string;
  isactive: boolean;
  name: string;
  transports: ITransportFromBack[];
}
interface ICompanyAction {
  type: string;
  companies?: ICompany[];
  companyInDetails: ICompany;
}
interface ICompanyDefaultState {
  loading: boolean;
  companies: ICompany[];
  companyInDetails: ICompany | null;
  activeCompanies: ICompany[];
  unActiveCompanies: ICompany[];
  activeTransports: ITransportFromBack[];
  unActiveTransports: ITransportFromBack[];
}
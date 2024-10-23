interface IHomeProps {
  transports: ITransport[];
}

interface DetailsModalProps {
  fromNotConnected?: boolean;
  setDetailsModalIsOpen: setBoolean;
  detailsClickHandler: () => void;
}

interface IStepsProps {
  stepValue: string;
  setStepValue: TSetString;
  disabledSteps: string[];
}

interface IStartAndEndDateValueAndSetter {
  setStartAndEndDate: TSetStartAndEndDate;
  startAndEndDate: IStartAndEndDate;
}

interface IPeriodSelectedValueAndSetter {
  periodSelected: IPeriodSelected;
  setPeriodSelected: TSetPeriodSelected;
}

interface IStartAndEndDateWithSetter {
  startAndEndDate: IStartAndEndDate;
  setStartAndEndDate: TSetStartAndEndDate;
}

interface IPassengerTrafficProps
  extends IValueAndOnChange,
    IStepValue,
    IStartAndEndDateValueAndSetter {}

interface ISelectedPeriodSectionProps
  extends IStepValue,
    IStartAndEndDateValueAndSetter,
    IValueAndOnChange {
  setTableIsOpen: setBoolean;
  tableIsOpen?: boolean;
}

interface ISelectedPeriodProps
  extends IStepValue,
    IStartAndEndDateValueAndSetter,
    IValueAndOnChange {
  setTableIsOpen: setBoolean;
  tableIsOpen?: boolean;
}
interface CheckboxProps {
  acceptedPrivacyPolicy: boolean;
  setAcceptedPrivacyPolicy: setBoolean;
  privacyError: null | string;
}

interface IInfoTableProps {
  stepValue: string;
}

interface ICalculationResultProps extends ICalculationResultAndSetter {
  income: number;
  salary: number;
}

interface IDateDropDown {
  setSelectedOption: (value: IStepOption) => void;
  selectedValue: IStepOption;
}

interface IPaginatedVideosProps extends IVideosProps {
  itemsPerPage: number;
  value: TValue;
}

interface IServiceSectionProps extends IStartAndEndDateValueAndSetter {
  endDate: Date | undefined;
  setEndDate: TSetDate;
  startDate: Date | undefined;
  setStartDate: TSetDate;
}

interface ICompaniesProps extends IAdminProps {}

interface IAdminProps {
  startAndEndDate: IStartAndEndDate;
}

interface IVideosProps {
  videosTransportId?: string;
  videosTransportNumber: string | undefined;
  setVideoModalIsOpen: setBoolean;
}

interface IVideoPlayModalProps {
  value: TValue;
  videosTransportNumber?: string;
  videosTransportId?: string;
  setVideoModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface ICalendarSectionProps extends IValueAndOnChange {}

interface ISelectedPeriod {
  step: string;
  date: Value;
}

interface DownloadModalProps {
  setDownloadModalIsOpen: setBoolean;
  fromActiveCar?: boolean;
  value?: TValue;
  stepValue?: string;
  transportId?: string;
}

interface IStepValue {
  stepValue: string;
  setStepValue: TSetString;
}

interface IPeriodTypeAndSetter {
  periodType: string;
  setPeriodType: TSetString;
}

interface ICarNumbersProps {
  stepValue: string;
  value: TValue;
}

interface ICompanyCardMobileProps {
  company: ICompany;
  fromNotConnected?: boolean;
  detailsClickHandler: () => void;
  onSetReportStep?: (option: IDropDownOption) => void
}

type TValue = (Date | undefined)[];
interface IValueAndOnChange {
  value: TValue;
  onChange: (date: Date | undefined) => void;
}

interface IActiveCarsInfo {
  startAndEndDate: IStartAndEndDate;
  value: TValue;
  stepValue: string;
}

interface IDateModalProps extends IStepValue, IValueAndOnChange {
  setModalIsOpen: setModalIsOpen;
  setStartAndEndDate: TSetStartAndEndDate;
  disabledSteps: string[];
  setDisabledSteps: Dispatch<SetStateAction<string[]>>;
}

interface ITimeInputGroupProps {
  shiftStart: string;
  shiftEnd: string;
  startTimeError: string | null;
  endTimeError: string | null;
  setShiftStart: TSetString;
  setStartTimeError: TSetStringOrNull;
  setShiftEnd: TSetString;
  setEndTimeError: TSetStringOrNull;
}

interface ICalculatorModalProps
  extends ISalaryInputGroupProps,
    ITimeInputGroupProps {
  handleSubmit: SubmitHandler;
}

interface ISalaryInputGroupProps {
  income: number;
  setIncome: TSetNumber;
  salary: number;
  setSalary: TSetNumber;
  incomeInputRef?: RefObject<HTMLInputElement>;
}

interface ServerSideProps {
  props: {
    data: YourDataType;
    theme: string;
  };
}

interface IMobileMenuActiveState {
  mobileMenuActive: boolean;
  setMobileMenuActive: setBoolean;
}

interface IOpenMobileMenuBtnProps extends IMobileMenuActiveState {
  fromPersonalAccount: boolean | undefined;
}

interface INavLinkProps extends IMobileMenuActiveState {
  dynamicClassName: string;
  path: string;
  title: string;
}

interface IDropDownProps {
  options: IDropDownOption[];
  name: string;
  disabled?: boolean;
  initiallySelectedOption?: IDropDownOption;
  makeTheChange?: (option: IDropDownOption) => void;
}

interface IUserCardMobileProps {
  user: IUserInfo;
  roleDropdownDisabled: boolean;
  defaultUserRoleOption: IDropDownOption;
  onSetUserRole: (option: IDropDownOption) => void;
}

interface IRadioButtonProps {
  id: string;
  name: string;
  nameForRequest: string;
  handleDownload: (event: any, fileType: string) => void;
}

interface ITransportCardMobileProps {
  transport: ITransportFromBack;
  onSetSchedule: TOnSetSchedule;
  onSetReportStep: (option: IDropDownOption) => void;
  scheduleForShow: (string | undefined)[]
}

interface ITextInputProps {
  changeHandler: TInputChangeHandler;
  label: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  inputValue: string | undefined;
  error?: string | null;
  required?: boolean;
  type?: string;
  classNameForLabel?: string;
  classNameForInput?: string;
  onKeyDown?: (() => void) | ((event: TKeyboardEvent) => void);
}

interface IAddTransportModalProps {
  setModalIsOpen: setBoolean;
  gosNumber: string;
  setGosNumber: TSetString;
}

interface IAddUserModalProps {
  setModalIsOpen: setBoolean;
}

interface IScheduleModalProps {
  setModalIsOpen: setBoolean;
}

interface ITextAreaAndSave {
  handleSubmit: (e: FormEvent) => Promise<void>;
  saveBtnDisabled: boolean;
}

interface ICommentTextAreaProps extends ITextAreaAndSave {
  name: string;
  changeHandler: TInputChangeHandler;
  inputValue: string | undefined;
  error?: string;
}

interface ISaveButtonProps extends ITextAreaAndSave {
  from?: string;
}

interface ITransportCardsProps {
  transportsToShow: [] | ITransportFromBack[];
  setReportStepWrapper: TSetReportStepWrapper;
  onSetSchedule: TOnSetSchedule;
}

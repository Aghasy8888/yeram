type TSetModalIsOpen = React.Dispatch<React.SetStateAction<boolean>>;
type TSetSelectedDateType = React.Dispatch<React.SetStateAction<number>>;
type THandleDateChange = (value: number) => void;
type setModalIsOpen = React.Dispatch<React.SetStateAction<boolean>>;
type TSetString = React.Dispatch<React.SetStateAction<string>>;
type TSetStringOrNull = React.Dispatch<React.SetStateAction<string | null>>;
type SubmitHandler = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
type SetFinance = React.Dispatch<React.SetStateAction<FinanceState>>;
type TSetNumber = React.Dispatch<React.SetStateAction<number>>;
type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type TSetDisabledSteps = Dispatch<SetStateAction<string[]>>;
type TSetPeriodSelected = Dispatch<
  SetStateAction<{
    yesterdayIsSelected: boolean;
    weekIsSelected: boolean;
    monthIsSelected: boolean;
  }>
>;
type TSetStartAndEndDate = Dispatch<
  SetStateAction<{
    start: string;
    end: string;
  }>
>;

type TSetTableOrDiagram = Dispatch<
  SetStateAction<{
    tableIcon: any;
    diagramIcon: any;
  }>
>;

type TSetDisabledSteps = Dispatch<SetStateAction<string[]>>;

type TRedirect = (url: string, type?: RedirectType | undefined) => never;

type TReturnedThunkFunction = (
  dispatch: ThunkMiddleware<
    void,
    Reducer<
      CombinedState<{
        authReducer: TAuthReducer;
        transportReducer: TTransportReducer;
        otherReducer: TOtherReducer;
      }>
    >,
    undefined,
    IAction
  >
) => void;

type TSetPeriodsBySteps = Dispatch<SetStateAction<string[]>>

type TSetDate = Dispatch<SetStateAction<Date | undefined>>;
type TSetPeriods = Dispatch<SetStateAction<string[]>>;

type TErrorSetter = Dispatch<SetStateAction<string | null>>;
type TInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

type TSetCompaniesToShow = Dispatch<SetStateAction<[] | ICompany[]>>;
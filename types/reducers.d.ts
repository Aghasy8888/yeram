type TAuthReducer = (
  state: IAuthDefaultState | undefined,
  action: IAuthAction
) => IAuthDefaultState;

type TTransportReducer = (
  state: ITransportDefaultState | undefined,
  action: ITransportAction
) => ITransportDefaultState;

type TOtherReducer = (
  state: IOtherDefaultState | undefined,
  action: IOtherAction
) => IOtherDefaultState;

type TVideoReducer = (
  state: IVideoDefaultState | undefined,
  action: IVideoAction
) => IVideoDefaultState;

type TAdminReducer = (
  state: IAdminDefaultState | undefined,
  action: IAdminAction
) => IAdminDefaultState;

type TCompanyReducer = (
  state: ICompanyDefaultState | undefined,
  action: ICompanyAction
) => ICompanyDefaultState;

type TMainReducer = Reducer<
  CombinedState<{
    authReducer: TAuthReducer;
    transportReducer: TTransportReducer;
    otherReducer: TOtherReducer;
    videoReducer: TVideoReducer;
    adminReducer: TAdminReducer;
    companyReducer: TCompanyReducer;
  }>
>;

type TDispatchType = ThunkMiddleware<void, TMainReducer, undefined, IAction>;

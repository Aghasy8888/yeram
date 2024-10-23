import roleOptions from '@/data/roleOptions';
import {
  ADMIN,
  ADMIN_OWNER,
  ADMIN_PAGE,
  DAYS,
  MODERATOR,
  MONTHS,
  PERSONAL_ACCOUNT,
  SUPER_ADMIN,
  USER,
  WEEKS,
} from '@/data/stepConstants';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getUserRole } from './helpers_4';
import { reportTransportsInfo } from '@/redux/features/transport/transportService';
import { formatDateArrayForRequest, sumCameIns } from './helpers_2';
import { setCompanyInDetails } from '@/redux/features/company/companySlice';
import { AppDispatch } from '@/redux/store';
import { setUserRole } from '@/redux/features/auth/userService';

interface IUserRoleBody {
    is_owner: boolean;
    staff_access: boolean;
    company_access: boolean;
    devices_access: boolean;
    user?: number;
}

export const getRolesBody = (userRole: string, user?: number) => {
  let userRoleBody: IUserRoleBody = {
    is_owner: true,
    staff_access: true,
    company_access: true,
    devices_access: true,        
  };

  switch (userRole) {
    case ADMIN_OWNER:
    userRoleBody = {
        is_owner: true,
        staff_access: true,
        company_access: true,
        devices_access: true,        
      };
    
      if(user) {
        userRoleBody.user = user;
      }

    return userRoleBody; 
    case ADMIN:
    userRoleBody = {
        is_owner: false,
        staff_access: true,
        company_access: true,
        devices_access: true,        
      };
    
      if(user) {
        userRoleBody.user = user;
      }

    return userRoleBody; 
    case MODERATOR:
    userRoleBody = {
        is_owner: false,
        staff_access: true,
        company_access: false,
        devices_access: true,        
      };
    
      if(user) {
        userRoleBody.user = user;
      }

    return userRoleBody; 
    case USER:
    userRoleBody = {
        is_owner: false,
        staff_access: false,
        company_access: false,
        devices_access: false,        
      };
    
      if(user) {
        userRoleBody.user = user;
      }

    return userRoleBody; 
  }
};

export const search = (
  object: never,
  name: TName | TName[],
  searchText: string
) => {
  const title = (object[name as TName] as string).toUpperCase();

  return title.includes(searchText.trim());
};

export const searchUser = (
  object: never,
  name: TName | TName[],
  searchText: string
) => {
  const firstName = object[(name as TName[])[0]] as string;
  const middleName = object[(name as TName[])[1]] as string;
  const lastName = object[(name as TName[])[2]] as string;
  const fullName = `${firstName} ${middleName} ${lastName}`.toUpperCase();

  return fullName.includes(searchText.trim());
};

export const createCustomMask = (value: string) => {
  // Dynamically adjust the mask based on the input
  const mask = [
    /[а-яА-Я]/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /[а-яА-Я]/,
    /[а-яА-Я]/,
    ' ',
    '(', // Static part of the mask
    /\d/,
    /\d/, // These two are always there
    // The next digit is optional based on input length
    value && value.length > 10 ? /\d/ : null,
    ' ',
    'R',
    'U',
    'S', // Static part of the mask
    ')',
  ].filter((part) => part !== null); // Remove nulls (optional parts not needed)

  return mask;
};

export const isValidGosNumber = (input: string) => {
  const trimmedLocationNumber = input.split('(')[1].split(' ')[0].trim();
  const gos_number = `${input.split('(')[0]}(${trimmedLocationNumber} RUS)`;
  const regex = /^[а-яА-Я] \d{3} [а-яА-Я]{2} \(\d{2,3} RUS\)$/;

  return regex.test(gos_number);
};

export const detailsClickHandler = (
  navigate: AppRouterInstance,
  dispatch: AppDispatch,
  companyInDetails: ICompany,
  setDetailsModalIsOpen: setBoolean,
  userRole: string
) => {
  setDetailsModalIsOpen(false);
  localStorage.setItem('companyInDetails', JSON.stringify(companyInDetails));

  dispatch(setCompanyInDetails({ companyInDetails, userRole }));

  navigate.push('/personalAccount/data');
};

export const setUserRoleWrapper = (
  navigate: AppRouterInstance,
  dispatch: TDispatch,
  option: IDropDownOption,
  user: IUserInfo
) => {
  const userRoleBody = getRolesBody(option.value);

  dispatch(
    setUserRole({data: userRoleBody as ISetUserRoleBody, navigate, dispatch, username: user.username})
  );
};

export const setReportStepWrapper = (
  navigate: AppRouterInstance,
  dispatch: AppDispatch,
  option: IDropDownOption,
  transports: ITransportFromBack[],
  company_id: string,
  from: string = PERSONAL_ACCOUNT
) => {
  const dateValue = getDateInterval(option.value);

  const [start, end] = formatDateArrayForRequest(
    (dateValue as Date[])[1]
      ? (dateValue as Date[])
      : ((dateValue as Date[])[0] as Date)
  ) as Array<TDateForRequest>;

  const transportIds = transports.map((transport) => transport.id);

  const reportData = {
    transport: [...transportIds],
    start, //example '2023-11-26 0'
    end: (end as { forRequest: string })?.forRequest, //example '2023-11-26 0'
    report_type: option.value,
  };

  dispatch(
    reportTransportsInfo({ dispatch, navigate, data: reportData, company_id, from })
  );
};

export const getUserRoleOption = (userRoleLocal: string) => {
  return roleOptions.find((option) => option.value === userRoleLocal);
};

export const getRoleDropDownDisabled = (
  userRoleLocal: string,
  userRole: string
) => {
  return (
    (userRoleLocal === ADMIN_OWNER && userRole !== SUPER_ADMIN) ||
    userRole === MODERATOR
  );
};

export const getRoleDropDownData = (userRole: string, user: IUserInfo) => {
  const userRoleLocal = getUserRole(user as IUserInfo);

  return {
    roleDropdownDisabled: getRoleDropDownDisabled(userRoleLocal, userRole),
    defaultUserRoleOption: getUserRoleOption(userRoleLocal),
  };
};

export const focusBeforeTwoSpaces = (inputElement: HTMLInputElement) => {
  const regex = /\s\s/;
  const match = inputElement.value.search(regex);

  inputElement.focus();

  if (match !== -1) {
    inputElement.setSelectionRange(match, match);
  } else {
    inputElement.focus();
  }
};

export const getActiveTransports = (companyInDetails: ICompany | null) => {
  return companyInDetails?.transports;
};

export const getDateInterval = (period: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (period) {
    case DAYS:
      return [new Date(today)];

    case WEEKS: {
      const endOfWeek = new Date(today);
      const startOfWeek = new Date(today.setDate(today.getDate() - 6));

      return [startOfWeek, endOfWeek];
    }

    case MONTHS: {
      const startOfMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const endOfMonth = new Date();

      return [startOfMonth, endOfMonth];
    }
  }
};

export const getCompanyTransportReports = (
  dispatch: AppDispatch,
  navigate: AppRouterInstance,
  company: ICompany
) => {
  const dateValue = getDateInterval(DAYS);

  const [start, end] = formatDateArrayForRequest(
    (dateValue as Date[])[1]
      ? (dateValue as Date[])
      : ((dateValue as Date[])[0] as Date)
  ) as Array<TDateForRequest>;

  company?.transports?.forEach((transport) => {
    const reportData = {
      transport: [transport.id],
      start, //example '2023-11-26 0'
      end: (end as { forRequest: string })?.forRequest, //example '2023-11-26 0'
      report_type: DAYS,
    };

    dispatch(
      reportTransportsInfo({
        dispatch,
        navigate,
        data: reportData,
        company_id: company.id,
        from: PERSONAL_ACCOUNT,
      })
    );
  });
};

export const getCompanyTotalReports = (
  dispatch: AppDispatch,
  navigate: AppRouterInstance,
  company: ICompany
) => {
  const dateValue = getDateInterval(DAYS);

  const [start, end] = formatDateArrayForRequest(
    (dateValue as Date[])[1]
      ? (dateValue as Date[])
      : ((dateValue as Date[])[0] as Date)
  ) as Array<TDateForRequest>;

  const transportIds = company.transports.map((transport) => transport.id);
  if (!transportIds[0]) return;

  const reportData = {
    transport: transportIds,
    start, //example '2023-11-26 0'
    end: (end as { forRequest: string })?.forRequest, //example '2023-11-26 0'
    report_type: DAYS,
  };

  dispatch(
    reportTransportsInfo({
      dispatch,
      navigate,
      data: reportData,
      company_id: company.id,
      from: ADMIN_PAGE,
    })
  );
};

export const getObjectsWithReports = (
  objects: {}[] | undefined,
  foundIndex: number,
  reports: IReportEntry[]
) => {
  const objectsWithReports = objects?.map((object, index) => {
    if (index === foundIndex) {
      const totalCameIns = sumCameIns(reports);
      return { ...object, totalCameIns };
    }
    return object;
  });

  return objectsWithReports;
};

export function letOnlyValidPhoneNumber(phoneNumber: string) {
  const phoneNumberPattern = /^\+7\d{10}$/;

  if (phoneNumberPattern.test(phoneNumber)) {
    return phoneNumber;
  } else {
    return '+7';
  }
}

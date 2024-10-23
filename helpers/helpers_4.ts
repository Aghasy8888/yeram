import {
  ADMIN,
  ADMIN_OWNER,
  MODERATOR,
  SUPER_ADMIN,
  USER,
} from '@/data/stepConstants';

export const handleDownload = (blob: Blob, type: string, file_type: string) => {
  const blobForUrl = new Blob([blob], {
    type,
  });
  const url = window.URL.createObjectURL(blobForUrl);
  const a = document.createElement('a');

  a.href = url;
  a.download = `reports.${file_type}`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const setClassNameByPathname = (
  pathname: string,
  styles: {
    readonly [key: string]: string;
  }
) => {
  switch (pathname) {
    case '/personalAccount/data':
      return `${styles.fromData}`;
    case '/personalAccount/transports':
      return `${styles.fromTransports}`;
    case '/personalAccount/users':
      return `${styles.fromUsers}`;

    default:
      return '';
  }
};

export const setTableColumnClasses = (
  styles: { readonly [key: string]: string },
  classNames: string[]
) => {
  const classesObject: { [key: string]: string } = {};

  classNames.forEach(
    (className) =>
      (classesObject[className] = `${styles.column} ${styles[className]}`)
  );

  return classesObject;
};

export function getTransportTableColumnStyle(
  columnStyles:
    | ITransportTableColumnClasses
    | {
        [key: string]: string;
      },
  index: number
) {
  switch (index) {
    case 0:
      return columnStyles.gosNumber;
    case 1:
      return columnStyles.schedule;
    case 2:
      return columnStyles.transported;
    case 3:
      return columnStyles.control;
    case 4:
      return columnStyles.connection;
    default:
      return;
  }
}

export function getUserTableColumnStyle(
  columnStyles:
    | IUserTableColumnClasses
    | {
        [key: string]: string;
      },
  index: number
) {
  switch (index) {
    case 0:
      return columnStyles.fullName;
    case 1:
      return columnStyles.email;
    case 2:
      return columnStyles.role;
    case 3:
      return columnStyles.connection;
    default:
      return;
  }
}

export function isInSelectedDate(
  dateString: string,
  endDateString: string
): boolean {
  const date = dateString.slice(0, -1);
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  const endDate = new Date(endDateString);

  return inputDate <= endDate;
}

export function isNotFutureDate(
  dateString: string,
  endDateString: string
): boolean {
  // console.log('dateString', dateString);

  const inputDate = new Date(dateString.slice(0, -1));
  // console.log('inputDate', inputDate);

  const now = new Date();
  const currentDate = new Date();
  const currentDateStringUTC = currentDate.toISOString().slice(0, -1);
  const currentDateInUTC = new Date(currentDateStringUTC);
  // console.log('currentDateInUTC', currentDateInUTC);

  const isNotFutureDate =
    isInSelectedDate(dateString, endDateString) && inputDate <= currentDate;

  return isNotFutureDate;
}

export const processStartAndEndDate = (
  startAndEndDate: IStartAndEndDate | undefined
) => {
  if (startAndEndDate?.end) {
    if (startAndEndDate?.end === startAndEndDate?.start) {
      return startAndEndDate?.start;
    }

    return `${startAndEndDate?.start}-${startAndEndDate?.end}`;
  } else {
    return startAndEndDate?.start;
  }
};

export function sortObjectPropertiesAlphabetically<
  T extends Record<string, any>
>(obj: T): T {
  const sortedObject: Record<string, any> = {};

  Object.keys(obj)
    .sort()
    .forEach((key: string) => {
      sortedObject[key] = obj[key];
    });

  return sortedObject as T;
}

export function sortTransportsByGosNumber(transports: ITransport[]) {
  return transports.sort((a, b) => a.gos_number.localeCompare(b.gos_number));
}

export const getUserRole = (userInfo: IUserInfo) => {
  const { is_owner, company_access, devices_access } = userInfo.roles;

  if (userInfo.is_superuser) return SUPER_ADMIN;
  if (is_owner) return ADMIN_OWNER;
  if (company_access) return ADMIN;
  if (devices_access) return MODERATOR;

  return USER;
};

export function containsOnlyNumbers(str: string): boolean {
  if (!str) return true;

  return /^\d+$/.test(str);
}

export const phoneContainsOnlyNumbers = (phoneNumber: string) => {
  phoneNumber = phoneNumber.substring(1);

  return containsOnlyNumbers(phoneNumber);
};

export const getEditBodyFromFormValues = (
  formValues: IEditFormValues,
  companyInDetails: ICompany | null
) => {
  const { PSRN, RBOC, TIN, TRRC } = formValues;

  return {
    ...formValues,
    id: companyInDetails?.id,
    isactive: companyInDetails?.isactive,
    PSRN: Number(PSRN),
    RBOC: Number(RBOC),
    TIN: Number(TIN),
    TRRC: Number(TRRC),
  };
};

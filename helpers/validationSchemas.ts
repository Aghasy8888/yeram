import {
  COMMENT,
  COMMENT_REQUIRED,
  COMPANY_NAME,
  PHONE,
  PHONE_EXACT_LENGTH_MESSAGE,
  PSRN,
  RBOC,
  TIN,
  TRRC,
} from '@/data/companyConstants';
import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .transform((originalValue, originalObject) =>
      originalValue === '' ? undefined : originalValue
    )
    .required('Имя пользователя обязательно')
    .matches(
      /^[a-zA-Z0-9@/./+/-/_]{1,150}$/,
      'Разрешены буквы, цифры и символы @/./+/-/_ (1-150 символов)'
    )
    .trim()
    .label('Имя пользователя'),
  password: Yup.string().trim().label('Пароль').required('Пароль обязателен'),
  email: Yup.string()
    .trim()
    .email('Email должен содержать символ "@" и домен после него')
    .test('has-dot-in-domain', 'Домен должен содержать точку', (value) => {
      const domain = value?.split('@')[1];
      return domain?.includes('.');
    })
    .label('Email')
    .required('Email обязателен')
    .max(254, 'Email должен содержать не более 254 символов'),
});

export const loginValidationSchema = Yup.object().shape({
  login: Yup.string().trim().label('Логин').required('Логин обязателен'),
  password: Yup.string().trim().label('Пароль').required('Пароль обязателен'),
});

export const resetPassValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Email должен содержать символ "@" и домен после него')
    .test('has-dot-in-domain', 'Домен должен содержать точку', (value) => {
      const domain = value?.split('@')[1];
      return domain?.includes('.');
    })
    .label('Email')
    .required('Email обязателен')
    .max(254, 'Email должен содержать не более 254 символов'),
});

export const addUserValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .transform((originalValue) =>
      originalValue === '' ? undefined : originalValue
    )
    .required('ФИО пользователя обязательно')
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ0-9@/./+/ /-/_]{1,150}$/,
      'Разрешены буквы (латинские и кириллические), цифры и символы @/./+/-/_ (1-150 символов)'
    )
    .trim()
    .label('ФИО пользователя'),
  email: Yup.string()
    .trim()
    .email('Email должен содержать символ "@" и домен после него')
    .test('has-dot-in-domain', 'Домен должен содержать точку', (value) => {
      const domain = value?.split('@')[1];
      return domain?.includes('.');
    })
    .label('Email')
    .required('Email обязателен')
    .max(254, 'Email должен содержать не более 254 символов'),
});

export const addTransportValidationSchema = Yup.object().shape({
  gosNumber: Yup.string()
    .trim()
    .label('Гос. номер')
    .required('Гос. номер обязателен'),
});

export const editCompanyValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .label(`${COMPANY_NAME}`)
    .required(`${COMPANY_NAME} обязателен`),
  comment: Yup.string()
    .trim()
    .label(`${COMMENT}`)
    .required(COMMENT_REQUIRED),
  phone: Yup.string()
    .trim()
    .label(`${PHONE}`)
    .length(12, PHONE_EXACT_LENGTH_MESSAGE)
    .min(3, `${PHONE} обязателен`),
  PSRN: Yup.string().trim().label(`${PSRN}`).required(`${PSRN} обязателен`),
  RBOC: Yup.string().trim().label(`${RBOC}`).required(`${RBOC} обязателен`),
  TIN: Yup.string().trim().label(`${TIN}`).required(`${TIN} обязателен`),
  TRRC: Yup.string().trim().label(`${TRRC}`).required(`${TRRC} обязателен`),
});

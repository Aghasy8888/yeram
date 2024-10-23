'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

import { WithLoading } from '@/app/components/admin';
import { CommentTextArea } from '@/app/components/personalAccount';
import { TextInput } from '@/app/common';
import {
  COMPANY_NAME,
  PHONE,
  PSRN,
  RBOC,
  TIN,
  TRRC,
} from '@/data/companyConstants';
import useSetDefaultFormValues from '@/hooks/useSetDefaultFormValues';
import { editCompanyValidationSchema } from '@/helpers/validationSchemas';
import {
  containsOnlyNumbers,
  getEditBodyFromFormValues,
  phoneContainsOnlyNumbers,
} from '@/helpers/helpers_4';
import useDisableEdit from '@/hooks/useDisableEdit';
import { selectEditCompanyBtnDisabled } from '@/redux/features/other/otherSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectCompanyInDetails,
  selectCompanyLoading,
} from '@/redux/features/company/companySlice';
import { editCompany } from '@/redux/features/company/companyService';
import { selectUserRole } from '@/redux/features/auth/authSlice';

import styles from './page.module.scss';


function Data() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const userRole = useAppSelector(selectUserRole);
  const companyInDetails: ICompany = useAppSelector(
    selectCompanyInDetails
  ) as ICompany;
  const showCompanySpinner = useAppSelector(selectCompanyLoading);
  const disableSave = useAppSelector(selectEditCompanyBtnDisabled);
  let editCompanyBodyFromStorage: IEditCompanyBody | undefined;
  if (typeof window !== 'undefined') {
    editCompanyBodyFromStorage = JSON.parse(
      window.localStorage.getItem('editCompanyRequestBody') as string
    );
  }

  const [formValues, setFormValues] = useState({
    name: '',
    comment: '',
    phone: '',
    PSRN: '',
    RBOC: '',
    TIN: '',
    TRRC: '',
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    comment?: string;
    phone?: string;
    PSRN?: string;
    RBOC?: string;
    TIN?: string;
    TRRC?: string;
  }>({});

  useDisableEdit(formValues, editCompanyBodyFromStorage);

  useSetDefaultFormValues(companyInDetails, setFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      name === 'phone' &&
      (!value.includes('+7') ||
        value.length > 12 ||
        !phoneContainsOnlyNumbers(value))
    ) {
      return;
    }
    if (
      name !== 'name' &&
      name !== 'comment' &&
      name !== 'phone' &&
      !containsOnlyNumbers(value)
    ) {
      return;
    }
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onEditCompany = async (e: FormEvent) => {
    e.preventDefault(); //prevent page from updating
    const editCompanyBody = getEditBodyFromFormValues(
      formValues,
      companyInDetails
    );

    if (
      JSON.stringify(editCompanyBody) ===
      JSON.stringify(editCompanyBodyFromStorage)
    ) {
      return;
    }

    try {
      await editCompanyValidationSchema.validate(formValues, {
        abortEarly: false,
      });

      if (companyInDetails?.id && userRole) {
        dispatch(
          editCompany({
            navigate,
            requestBody: editCompanyBody as IEditCompanyBody,
            userRole,
            dispatch
          })
        );
      }

      setValidationErrors({});
    } catch (error) {
      if (Yup.ValidationError.isError(error)) {
        const errors: Partial<FormValues> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            const key = err.path as keyof FormValues;
            errors[key] = err.message;
          }
        });
        setValidationErrors(errors as typeof validationErrors);
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading showSpinner={showCompanySpinner}>
          <form onSubmit={onEditCompany}>
            <div className={styles.companyDataCtn}>
              <TextInput
                changeHandler={handleChange}
                inputValue={formValues.name}
                label={COMPANY_NAME}
                name="name"
                classNameForLabel="companyData"
                classNameForInput="withBorder"
                error={validationErrors.name}
              />
            </div>

            <div className={styles.companyDataCtn}>
              <TextInput
                changeHandler={handleChange}
                inputValue={formValues.TIN}
                label={TIN}
                name="TIN"
                classNameForLabel="companyData"
                classNameForInput="withBorder"
                error={validationErrors.TIN}
              />
            </div>

            <div className={styles.companyDataCtn}>
              <TextInput
                changeHandler={handleChange}
                inputValue={formValues.TRRC}
                label={TRRC}
                name="TRRC"
                classNameForLabel="companyData"
                classNameForInput="withBorder"
                error={validationErrors.TRRC}
              />
            </div>

            <div className={styles.companyDataCtn}>
              <TextInput
                changeHandler={handleChange}
                inputValue={formValues.PSRN}
                label={PSRN}
                name="PSRN"
                classNameForLabel="companyData"
                classNameForInput="withBorder"
                error={validationErrors.PSRN}
              />
            </div>

            <div className={styles.companyDataCtn}>
              <TextInput
                changeHandler={handleChange}
                inputValue={formValues.RBOC}
                label={RBOC}
                name="RBOC"
                classNameForLabel="companyData"
                classNameForInput="withBorder"
                error={validationErrors.RBOC}
              />
            </div>

            <div className={styles.companyDataCtn}>
              <TextInput
                changeHandler={handleChange}
                inputValue={formValues.phone}
                label={PHONE}
                name="phone"
                classNameForLabel="companyData"
                classNameForInput="withBorder"
                error={validationErrors.phone}
              />
            </div>

            <CommentTextArea
              changeHandler={handleChange}
              inputValue={formValues.comment}
              saveBtnDisabled={disableSave}
              handleSubmit={onEditCompany}
              name="comment"
              error={validationErrors.comment}
            />
          </form>
        </WithLoading>
      </div>
    </main>
  );
}

export default Data;

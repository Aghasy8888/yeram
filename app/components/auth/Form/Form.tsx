'use client';

import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { FormInputGroup, LinksToAuthPages } from '..';
import { loginValidationSchema, registerValidationSchema, resetPassValidationSchema } from '@/helpers/validationSchemas';
import useGetPage from '@/hooks/useGetPage';
import * as constants from '../../../(auth)/constants';
import { login, register } from '@/store/actions/user/userActions';

import styles from './FormStyles.module.scss';

const Form = () => {
  const navigate = useRouter();
  const dispatch = useDispatch<TDispatch>();
  const page = useGetPage();
  const [privacyError, setPrivacyError] = useState<null | string>(null);
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    login: '',
    password: '',
    email: '',
  });

  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    login?: string;
    password?: string;
    email?: string;
  }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, username, login: loginValue } = formValues;

    if (!acceptedPrivacyPolicy && page === constants.register) {
      setPrivacyError(
        'Примите политику конфиденциальности, чтобы продолжить регистрацию.'
      );
      
      return;
    } else {
      setPrivacyError(null);
    }
   
    try {
      switch (page) {
        case constants.login:
          await loginValidationSchema.validate(formValues, { abortEarly: false });
          const loginValues = { 
            username: loginValue,            
            password,
          }

          dispatch(login(loginValues, navigate));
          break;
    
        case constants.register:
          await registerValidationSchema.validate(formValues, { abortEarly: false });
          const registerValues = {
            email, 
            password,
            username
          }

          dispatch(register(registerValues, navigate));

          break;
    
        case constants.resetPassword:
          await resetPassValidationSchema.validate(formValues, { abortEarly: false });
        break;
      }
      
      setValidationErrors({});
      
      //submit form logic
    } catch (error) {
      if (Yup.ValidationError.isError(error)) {
        const errors: Partial<FormValues> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            const key = err.path as keyof FormValues;
            errors[key] = err.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onEmptyState = () => {
    setFormValues({
      username: '',
      login: '',
      password: '',
      email: '',
    });
    setValidationErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormInputGroup
        privacyError={privacyError}
        acceptedPrivacyPolicy={acceptedPrivacyPolicy}
        setAcceptedPrivacyPolicy={setAcceptedPrivacyPolicy}
        formValues={formValues}
        handleChange={handleChange}
        validationErrors={validationErrors}
      />

      <LinksToAuthPages onEmptyState={onEmptyState} />

      <button className={styles.enter} onClick={handleSubmit}>
        Войти
      </button>
    </form>
  );
};

export default Form;

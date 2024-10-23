interface IValidationErrors {
  username?: string;
  login?: string;
  password?: string;
  email?: string;
}

interface IFormValues {
  username: string;
  login: string;
  password: string;
  email: string;
}

interface IFormInputGroupProps extends CheckboxProps {
  validationErrors: IValidationErrors;
  formValues: IFormValues;
  privacyError: null | string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormValues {
  username: string;
  login: string;
  password: string;
  email: string;
}

type TValidationSchema = Yup.ObjectSchema<{}, Yup.AnyObject, {}, "">

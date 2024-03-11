
import useGetPage from '@/hooks/useGetPage';
import * as constants from '../../../(auth)/constants';
import { Checkbox } from '../common';
import usePageBooleans from '@/hooks/usePageBooleans';

import styles from './FormInputGroupStyles.module.scss';

const FormInputGroup = ({
  validationErrors,
  formValues,
  handleChange,
  acceptedPrivacyPolicy,
  setAcceptedPrivacyPolicy,
  privacyError,
}: IFormInputGroupProps) => {
  const { resetOrRegisterBoolean, loginOrRegisterBoolean } = usePageBooleans();

  const page = useGetPage();

  return (
    <div className={styles.inputGroup}>
      {page === constants.register && (
        <div
          className={`${styles.inputCtn} ${
            validationErrors.username && styles.withError
          }`}
        >
          <input
            className={validationErrors.username && styles.withError}
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Имя пользователя"
          />
          <div className={styles.error}>{validationErrors.username}</div>
        </div>
      )}
      {page === constants.login && (
        <div
          className={`${styles.inputCtn} ${
            validationErrors.login && styles.withError
          }`}
        >
          <input
            className={validationErrors.login && styles.withError}
            type="text"
            name="login"
            value={formValues.login}
            onChange={handleChange}
            placeholder="Логин"
          />
          <div className={styles.error}>{validationErrors.login}</div>
        </div>
      )}

      {loginOrRegisterBoolean && (
        <div
          className={`${styles.inputCtn} ${
            validationErrors.password && styles.withError
          }`}
        >
          <input
            className={validationErrors.password && styles.withError}
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Пароль"
          />
          <div className={styles.error}>{validationErrors.password}</div>
        </div>
      )}

      {resetOrRegisterBoolean && (
        <div
          className={`${styles.inputCtn} ${
            validationErrors.email && styles.withError
          }`}
        >
          <input
            className={validationErrors.email && styles.withError}
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email адрес"
          />
          <div className={styles.error}>{validationErrors.email}</div>
        </div>
      )}

      {page === constants.register && (
        <Checkbox
          privacyError={privacyError}
          acceptedPrivacyPolicy={acceptedPrivacyPolicy}
          setAcceptedPrivacyPolicy={setAcceptedPrivacyPolicy}
        />
      )}
    </div>
  );
};

export default FormInputGroup;

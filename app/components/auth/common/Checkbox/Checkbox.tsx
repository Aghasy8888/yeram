import Link from 'next/link';
import styles from './CheckboxStyles.module.scss';

const Checkbox = ({
  acceptedPrivacyPolicy,
  setAcceptedPrivacyPolicy,
  privacyError,
}: CheckboxProps) => {
const handleCheckboxChange = () => {
  setAcceptedPrivacyPolicy((prevChecked) => !prevChecked);
};

  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkboxInput}
        type="checkbox"
        checked={acceptedPrivacyPolicy}
        onChange={handleCheckboxChange}
      />

      <Link href={'privacyPolicy'} className={styles.acceptTerms}>
        принимаю условия использования сервиса и  политику обработки
        персональных данных
      </Link>
      
      <p className={styles.error}>{privacyError}</p>

    </div>
  );
};

export default Checkbox;

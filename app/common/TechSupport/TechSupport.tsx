import { PHONE_NUMBER } from '@/data/stepConstants';

import styles from './TechSupportStyles.module.scss';

const TechSupport = () => {
  return (
    <>
      <h4 className={styles.techSupport}>Тех. поддержка:</h4>
      <a className={styles.supportPhoneNumber} href={`tel:${PHONE_NUMBER}`}>
        {PHONE_NUMBER}
      </a>
    </>
  );
};

export default TechSupport;

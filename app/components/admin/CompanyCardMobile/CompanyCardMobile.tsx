import { DropDown, OneDot } from '@/app/common';
import { GREEN_COLOR, NONE } from '@/data/stepConstants';
import { OnOffButtons } from '..';
import stepOptions from '@/data/stepOptions';

import styles from './CompanyCardMobileStyles.module.scss';

const CompanyCardMobile = ({
  company,
  fromNotConnected,
}: ICompanyCardMobileProps) => {
  
  return (
    <article className={styles.companyCard}>
      <header
        className={`${styles.cardHeader} ${
          fromNotConnected ? styles.fromNotConnected : ''
        }`}
      >
        {fromNotConnected ? (
          <>
            <div className={`${styles.name} ${styles.fromNotConnected}`}>
              {company.name}
            </div>
            <div className={styles.email}>example@.gmail.com</div>
          </>
        ) : (
          <>
            <div className={styles.name}>
              <OneDot color={company.isactive ? GREEN_COLOR : NONE} />
              {company.name}
            </div>
            <div className={styles.contentCtn}>
              <div className={styles.transportedCtn}>
                <p className={styles.transportedCount}>20000</p>
                <DropDown name="step" options={stepOptions} />
              </div>
              <OnOffButtons />
            </div>
          </>
        )}
      </header>
      <button className={styles.inDetailsBtn}>Подробнее</button>
      <button className={styles.onOffBtn}>Отключить</button>
    </article>
  );
};

export default CompanyCardMobile;

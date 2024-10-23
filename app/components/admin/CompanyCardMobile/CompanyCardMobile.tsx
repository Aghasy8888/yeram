import { DropDown, OneDot } from '@/app/common';
import { GREEN_COLOR, NONE, SUPER_ADMIN } from '@/data/stepConstants';
import { OnOffButtons } from '..';
import stepOptions from '@/data/stepOptions';
import { getDisplayOrDataEditRqBody } from '@/helpers/helpers_6';
import { useAppDispatch } from '@/redux/hooks';
import { editCompany } from '@/redux/features/company/companyService';
import { useRouter } from 'next/navigation';

import styles from './CompanyCardMobileStyles.module.scss';

const CompanyCardMobile = ({
  company,
  fromNotConnected,
  detailsClickHandler,
  onSetReportStep,
}: ICompanyCardMobileProps) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const onDataOrDisplayClick = (checked: boolean, info: string) => {
    const bodyWithoutId = getDisplayOrDataEditRqBody(info, checked);
    const requestBody = {
      ...bodyWithoutId,
      id: company?.id,
    };

    dispatch(
      editCompany({
        navigate,
        requestBody,
        userRole: SUPER_ADMIN,
        dispatch
      })
    );
  };

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
                <p className={styles.transportedCount}>
                  {company.totalCameIns ? company.totalCameIns : 0}
                </p>
                <DropDown
                  makeTheChange={onSetReportStep}
                  name="step"
                  options={stepOptions}
                />
              </div>
              <OnOffButtons
                onChange={onDataOrDisplayClick}
                dataChecked={true}
                displayChecked={company.isactive}
              />
            </div>
          </>
        )}
      </header>
      <button className={styles.inDetailsBtn} onClick={detailsClickHandler}>
        Подробнее
      </button>
      <button className={styles.onOffBtn}>Отключить</button>
    </article>
  );
};

export default CompanyCardMobile;

'use client';

import { WithLoading } from '@/app/components/admin';
import { useAppSelector } from '@/store/store';
import companyData from '@/data/temporary/companyData';
import { CommentTextArea } from '@/app/components/personalAccount';

import styles from './page.module.scss';

function Data() {
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const companyInDetails: ICompany | null = useAppSelector(
    (state) => state.companyReducer.companyInDetails
  );
  const showAdminSpinner = useAppSelector(
    (state) => state.adminReducer.loading
  );

  const companyDataComponents = companyData.map((data, i) => (
    <div key={i} className={styles.companyDataCtn}>
      <div className={styles.companyData}>{data.dataName}</div>
      <div className={`${styles.phoneNumber} ${styles.withBorder}`}>
        {data.data}
      </div>
    </div>
  ));

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading showSpinner={showAdminSpinner}>
          <div className={styles.companyDataCtn}>
            <div className={styles.companyData}>Название компании</div>
            <div className={`${styles.companyName} ${styles.withBorder}`}>
              {companyInDetails?.name}
            </div>
          </div>
          {companyDataComponents}
          <div className={styles.companyDataCtn}>
            <div className={styles.companyData}>Телефон</div>
            <div className={`${styles.phoneNumber} ${styles.withBorder}`}>
              {user?.phone}
            </div>
          </div>

          <CommentTextArea />
        </WithLoading>
      </div>
    </main>
  );
}

export default Data;

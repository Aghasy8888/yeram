'use client';

import { useState } from 'react';
import {
  CompanyCardMobile,
  DetailsModal,
  WithLoading,
} from '@/app/components/admin';
import { useAppSelector } from '@/store/store';
import { ThreeDots } from '@/app/common';
import { GREEN_COLOR, WHITE_COLOR } from '@/data/stepConstants';
import useCloseModal from '@/hooks/useCloseModal';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import useSearch from '@/hooks/useSearch';

import styles from './page.module.scss';

function AdminOfNotConnected() {
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  const showAdminSpinner = useAppSelector(
    (state) => state.adminReducer.loading
  );
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{
    [key: string]: boolean;
  }>({});
  const companies: ICompany[] = useAppSelector(
    (state) => state.companyReducer.unActiveCompanies
  );
  const [companiesToShow, setCompaniesToShow] = useState<ICompany[] | []>(
    companies
  );  

  useSearch(setCompaniesToShow, companies as [], 'name', companies as []);

  const companyComponents = companiesToShow.map((company) => {
    const modalIsOpen = detailsModalIsOpen && detailsModal[company?.id];

    return (
      <tr key={company?.id}>
        <td className={`${styles.column} ${styles.name}`}>{company?.name}</td>
        <td className={`${styles.column} ${styles.email}`}>
          example@.gmail.com
        </td>
        <td className={`${styles.column} ${styles.spread}`}>
          <button
            className={styles.detailsBtn}
            onClick={() => handleDetailsModal(company)}
          >
            <ThreeDots color={modalIsOpen ? GREEN_COLOR : WHITE_COLOR} />
          </button>
          {modalIsOpen && (
            <DetailsModal
              companyInDetails={company}
              fromNotConnected
              setDetailsModalIsOpen={setDetailsModalIsOpen}
            />
          )}
        </td>
      </tr>
    );
  });

  const handleDetailsModal = (company: ICompany) => {
    setDetailsModalIsOpen(true);

    setDetailsModal(() => ({
      [company?.id]: true,
    }));
  };

  useCloseModal(detailsModalIsOpen, setDetailsModalIsOpen);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading showSpinner={showAdminSpinner}>
          <>
            {lessThan_690_Screen ? (
              companiesToShow.map((company) => (
                <div key={company?.id}>
                  <CompanyCardMobile fromNotConnected company={company} />
                </div>
              ))
            ) : (
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <th
                      className={`${styles.column} ${styles.name} ${styles.inHeader}`}
                    >
                      Название
                    </th>
                    <th
                      className={`${styles.column} ${styles.email} ${styles.inHeader}`}
                    >
                      email
                    </th>
                    <th className={`${styles.column}`}></th>
                  </tr>
                  {companyComponents}
                </tbody>
              </table>
            )}
          </>
        </WithLoading>
      </div>
    </main>
  );
}

export default AdminOfNotConnected;

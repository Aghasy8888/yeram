'use client';

import { useState } from 'react';

import {
  CompanyCardMobile,
  DetailsModal,
  OnOffButtons,
  WithLoading,
} from '@/app/components/admin';
import { useAppSelector } from '@/store/store';
import { OneDot, ThreeDots, DropDown } from '@/app/common';
import { GREEN_COLOR, NONE, WHITE_COLOR } from '@/data/stepConstants';
import useCloseModal from '@/hooks/useCloseModal';
import tableHeaderColumns from '@/data/adminTableHeaderColumns';
import { getColumnStyle } from '@/helpers/helpers_3';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import stepOptions from '@/data/stepOptions';
import useSearch from '@/hooks/useSearch';

import styles from './page.module.scss';

const columnStyles = {
  nameHeader: `${styles.column} ${styles.name} ${styles.inHeader}`,
  transported: `${styles.column} ${styles.transported}`,
  control: `${styles.column} ${styles.control}`,
  empty: `${styles.column}`,
};

function AdminOfConnected() {
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  const showAdminSpinner = useAppSelector(
    (state) => state.adminReducer.loading
  );
  const companies: ICompany[] | [] = useAppSelector(
    (state) => state.companyReducer.activeCompanies
  );
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{
    [key: string]: boolean;
  }>({});
  const [companiesToShow, setCompaniesToShow] = useState<ICompany[] | []>(
    companies
  );

  useSearch(setCompaniesToShow, companies as [], 'name', companies as []);

  const tableHeaderCells = tableHeaderColumns.map((content, index) => (
    <th key={index} className={getColumnStyle(columnStyles, index)}>
      {content}
    </th>
  ));

  const companyComponents = companiesToShow.map((company) => {
    const modalIsOpen = detailsModalIsOpen && detailsModal[company?.id];

    return (
      <tr key={company?.id}>
        <td className={`${styles.column} ${styles.name}`}>
          <OneDot color={company?.isactive ? GREEN_COLOR : NONE} />
          {company?.name}
        </td>
        <td className={`${styles.column} ${styles.transported}`}>
          <div className={styles.transportedCtn}>
            <p className={styles.transportedCount}>20000</p>
            <DropDown name="step" options={stepOptions} />
          </div>
        </td>
        <td className={`${styles.column} ${styles.control}`}>
          <OnOffButtons />
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
                  <CompanyCardMobile company={company} />
                </div>
              ))
            ) : (
              <table className={styles.table}>
                <tbody>
                  <tr>{tableHeaderCells}</tr>
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

export default AdminOfConnected;

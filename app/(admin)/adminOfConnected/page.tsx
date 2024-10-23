'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CompanyCardMobile,
  DetailsModal,
  OnOffButtons,
  WithLoading,
} from '@/app/components/admin';
import { OneDot, ThreeDots, DropDown } from '@/app/common';
import {
  ADMIN_PAGE,
  GREEN_COLOR,
  NONE,
  SUPER_ADMIN,
  WHITE_COLOR,
} from '@/data/stepConstants';
import useCloseModal from '@/hooks/useCloseModal';
import tableHeaderColumns from '@/data/adminTableHeaderColumns';
import { getColumnStyle } from '@/helpers/helpers_3';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import stepOptions from '@/data/stepOptions';
import useSearch from '@/hooks/useSearch';
import { detailsClickHandler, setReportStepWrapper } from '@/helpers/helpers_5';
import { selectActiveCompanies, selectCompanies } from '@/redux/features/company/companySlice';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import styles from './page.module.scss';
import { getDisplayOrDataEditRqBody } from '@/helpers/helpers_6';
import { editCompany } from '@/redux/features/company/companyService';

const columnStyles = {
  nameHeader: `${styles.column} ${styles.name} ${styles.inHeader}`,
  transported: `${styles.column} ${styles.transported}`,
  control: `${styles.column} ${styles.control}`,
  empty: `${styles.column}`,
};

function AdminOfConnected() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  // const companies: ICompany[] | [] = useAppSelector(selectActiveCompanies);
  const companies: ICompany[] | [] = useAppSelector(selectCompanies);
  const userRole = useAppSelector(selectUserRole);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{
    [key: string]: boolean;
  }>({});
  const [companiesToShow, setCompaniesToShow] = useState<ICompany[] | []>(
    companies
  );

  const onDetailsClick = (companyInDetails: ICompany) => {
    detailsClickHandler(
      navigate,
      dispatch,
      companyInDetails,
      setDetailsModalIsOpen,
      userRole
    );
  };

  useSearch(setCompaniesToShow, companies as [], 'name');

  const tableHeaderCells = tableHeaderColumns.map((content, index) => (
    <th key={index} className={getColumnStyle(columnStyles, index)}>
      {content}
    </th>
  ));

  const companyComponents = companiesToShow.map((company) => {
    const modalIsOpen = detailsModalIsOpen && detailsModal[company?.id];

    const onSetReportStep = (option: IDropDownOption) => {
      setReportStepWrapper(
        navigate,
        dispatch,
        option,
        [...company.transports],
        company?.id,
        ADMIN_PAGE
      );
    };

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
      <tr key={company?.id}>
        <td className={`${styles.column} ${styles.name}`}>
          <OneDot color={company?.isactive ? GREEN_COLOR : NONE} />
          {company?.name}
        </td>
        <td className={`${styles.column} ${styles.transported}`}>
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
        </td>
        <td className={`${styles.column} ${styles.control}`}>
          <OnOffButtons onChange={onDataOrDisplayClick} dataChecked={true} displayChecked={company.isactive} />
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
              detailsClickHandler={() => onDetailsClick(company)}
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
        <WithLoading>
          <>
            {lessThan_690_Screen ? (
              companiesToShow.map((company) => {
                const onSetReportStep = (option: IDropDownOption) => {
                  setReportStepWrapper(
                    navigate,
                    dispatch,
                    option,
                    [...company.transports],
                    company?.id,
                    ADMIN_PAGE
                  );
                };

                return (
                  <div key={company?.id}>
                    <CompanyCardMobile
                      onSetReportStep={onSetReportStep}
                      detailsClickHandler={() => onDetailsClick(company)}
                      company={company}
                    />
                  </div>
                );
              })
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

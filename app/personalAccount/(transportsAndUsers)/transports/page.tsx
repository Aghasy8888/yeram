'use client';

import { FormEvent, memo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { OnOffButtons, WithLoading } from '@/app/components/admin';
import tableHeaderColumns, {
  tableHeaderColumnsEnglish,
} from '@/data/transportTableHeaderColumns';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import {
  getTransportTableColumnStyle,
  setTableColumnClasses,
} from '@/helpers/helpers_4';
import { Checkbox, DropDown, Ellipse, SaveButton } from '@/app/common';
import stepOptions from '@/data/stepOptions';
import {
  AddTransportModal,
  ScheduleModal,
  TransportCards,
  WaitingForConnection,
} from '@/app/components/personalAccount';
import useCloseModal from '@/hooks/useCloseModal';
import { DISPLAY, SUPER_ADMIN } from '@/data/stepConstants';
import useSearch from '@/hooks/useSearch';
import useGetTransportReports from '@/hooks/useGetTransportReports';
import { setReportStepWrapper } from '@/helpers/helpers_5';
import {
  getDisplayOrDataEditRqBody,
  getScheduleForShow,
} from '@/helpers/helpers_6';
import {
  selectActiveTransports,
  selectCompanyInDetails,
} from '@/redux/features/company/companySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { selectTransportLoading } from '@/redux/features/transport/transportSlice';
import { editTransport } from '@/redux/features/transport/transportService';

import styles from './page.module.scss';
import useUpdateLocalStorage from '@/hooks/useUpdateLocalStorage';

const transportTableColumnStyles = setTableColumnClasses(
  styles,
  tableHeaderColumnsEnglish
);

function Transports() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const userRole = useAppSelector(selectUserRole);
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  const lessThan_1640_Screen = useMediaWidth(windowWidth <= 1640);
  const [gosNumber, setGosNumber] = useState('');
  const showTransportSpinner = useAppSelector(selectTransportLoading);
  const activeTransports: ITransportFromBack[] | [] = useAppSelector(
    selectActiveTransports
  );
  const companyInDetails: ICompany = useAppSelector(
    selectCompanyInDetails
  ) as ICompany;
  const [transportToEdit, setTransportToEdit] =
    useState<ITransportFromBack | null>(null);

  const [transportsToShow, setTransportsToShow] = useState<
    ITransportFromBack[] | []
  >(activeTransports);

  useSearch(setTransportsToShow, activeTransports as [], 'gos_number');

  useGetTransportReports();
  useUpdateLocalStorage();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);

  const onSetSchedule = (transport: ITransportFromBack) => {
    setScheduleModalIsOpen(true);
    setTransportToEdit(transport);
  };

  const tableHeaderCells = tableHeaderColumns.map((content, index) => (
    <th
      key={index}
      className={`${getTransportTableColumnStyle(
        transportTableColumnStyles,
        index
      )} ${userRole !== SUPER_ADMIN ? styles.userVersion : ''}`}
    >
      {index === 4 && lessThan_1640_Screen ? '' : content}
    </th>
  ));

  const transportComponents = transportsToShow?.map((transport, index) => {
    const scheduleForShow = getScheduleForShow(transport);

    const onSetReportStep = (option: IDropDownOption) => {
      setReportStepWrapper(
        navigate,
        dispatch,
        option,
        [transport],
        companyInDetails?.id
      );
    };

    const onDataOrDisplayClick = (checked: boolean, info: string) => {
      const requestBody = getDisplayOrDataEditRqBody(
        info,
        checked
      );

      dispatch(
        editTransport({
          dispatch,
          navigate,
          company_id: companyInDetails.id,
          transport_id: transport.id,
          requestBody,
        })
      );
    };

    return (
      <tr key={index}>
        <td
          className={`${styles.column} ${styles.gosNumber} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <div className={styles.ellipse}>
            <Ellipse object={transport} />
          </div>

          {transport?.gos_number}
        </td>

        <td
          className={`${styles.column} ${styles.schedule} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <button
            onClick={() => onSetSchedule(transport)}
            className={styles.openScheduleBtn}
          >
            {scheduleForShow[0] ? scheduleForShow : '-'}
          </button>
        </td>

        <td
          className={`${styles.column} ${styles.transported} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <div
            className={`${styles.transportedCtn} ${
              userRole !== SUPER_ADMIN ? styles.userVersion : ''
            }`}
          >
            <p className={styles.transportedCount}>{transport?.totalCameIns}</p>
            <DropDown
              makeTheChange={onSetReportStep}
              name="inTransportsStep"
              options={stepOptions}
            />
          </div>
        </td>

        <td
          className={`${styles.column} ${styles.control} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <OnOffButtons
            dataChecked={Boolean(transport.islock)}
            displayChecked={transport.isactive}
            onChange={onDataOrDisplayClick}
            name="Transports"
          />
        </td>

        <td
          className={`${styles.column} ${styles.connection} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <Checkbox defaultChecked={transport?.isactive} />
        </td>
      </tr>
    );
  });

  const handleSave = async (e: FormEvent) => {
    console.log('handle Save transports');
  };

  useCloseModal(modalIsOpen, setModalIsOpen);
  useCloseModal(scheduleModalIsOpen, setScheduleModalIsOpen);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading showSpinner={showTransportSpinner}>
          <div className={styles.addTransportBtnCtn}>
            <button
              onClick={() => setModalIsOpen(true)}
              className={styles.addTransportOrUserBtn}
            >
              добавить ТС
            </button>
          </div>

          {lessThan_690_Screen ? (
            <div
              className={`${styles.transportCardsCtn} ${
                transportsToShow?.length < 2 ? styles.lessThanTwoTransports : ''
              }`}
            >
              <TransportCards
                onSetSchedule={onSetSchedule}
                setReportStepWrapper={setReportStepWrapper}
                transportsToShow={transportsToShow}
              />
            </div>
          ) : (
            <table className={styles.table}>
              <tbody>
                <tr>{tableHeaderCells}</tr>
                {transportComponents}
              </tbody>
            </table>
          )}
          {/* 
          <SaveButton
            saveBtnDisabled
            from="Transport"
            handleSubmit={handleSave}
          /> */}
          <WaitingForConnection />

          {modalIsOpen && (
            <AddTransportModal
              gosNumber={gosNumber}
              setGosNumber={setGosNumber}
              setModalIsOpen={setModalIsOpen}
            />
          )}
          {scheduleModalIsOpen && (
            <ScheduleModal
              transport={transportToEdit}
              setModalIsOpen={setScheduleModalIsOpen}
            />
          )}
        </WithLoading>
      </div>
    </main>
  );
}

export default memo(Transports);

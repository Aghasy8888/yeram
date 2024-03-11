'use client';

import { useState } from 'react';
import { OnOffButtons, WithLoading } from '@/app/components/admin';
import { useAppSelector } from '@/store/store';
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
  TransportCardMobile,
  WaitingForConnection,
} from '@/app/components/personalAccount';
import useCloseModal from '@/hooks/useCloseModal';
import { SUPER_ADMIN, USER } from '@/data/stepConstants';
import useSearch from '@/hooks/useSearch';

import styles from './page.module.scss';

const transportTableColumnStyles = setTableColumnClasses(
  styles,
  tableHeaderColumnsEnglish
);

function Transports() {
  const userRole = useAppSelector((state) => state.authReducer.userRole);
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  const lessThan_1640_Screen = useMediaWidth(windowWidth <= 1640);
  const showAdminSpinner = useAppSelector(
    (state) => state.adminReducer.loading
  );
  let activeTransports: ITransportFromBack[] | [] = useAppSelector(
    (state) => state.companyReducer.activeTransports
  );
  const ownTransports = useAppSelector(
      (state) => state.transportReducer.transports
    );
  if (userRole !== SUPER_ADMIN) {
    activeTransports = ownTransports;
  }
  const [transportsToShow, setTransportsToShow] = useState<ITransportFromBack[] | []>(
    activeTransports
  );

  useSearch(setTransportsToShow, activeTransports as [], 'gos_number', activeTransports as []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

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
    // const modalIsOpen = detailsModalIsOpen && detailsModal[transport.id];

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

          {transport.gos_number}
        </td>

        <td
          className={`${styles.column} ${styles.schedule} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <button
            onClick={() => setScheduleModalIsOpen(true)}
            className={styles.openScheduleBtn}
          >
            {/* {transport.schedule} */} schedule
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
            <p className={styles.transportedCount}>20000</p>
            <DropDown name="inTransports?Step" options={stepOptions} />
          </div>
        </td>

        <td
          className={`${styles.column} ${styles.control} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <OnOffButtons name="Transports" />
        </td>

        <td
          className={`${styles.column} ${styles.connection} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <Checkbox />
        </td>
      </tr>
    );
  });

  const transportCards = transportsToShow?.map((transport, index) => (
    <div key={index}>
      <TransportCardMobile
        setScheduleModalIsOpen={setScheduleModalIsOpen}
        transport={transport}
      />
    </div>
  ));

  const handleSave = () => {
    console.log('handle Save transports');
  };

  useCloseModal(modalIsOpen, setModalIsOpen);
  useCloseModal(scheduleModalIsOpen, setScheduleModalIsOpen);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading showSpinner={showAdminSpinner}>
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
                transportsToShow.length < 2 ? styles.lessThanTwoTransports : ''
              }`}
            >
              {transportCards}
            </div>
          ) : (
            <table className={styles.table}>
              <tbody>
                <tr>{tableHeaderCells}</tr>
                {transportComponents}
              </tbody>
            </table>
          )}

          <SaveButton from="Transport" handleSave={handleSave} />

          <WaitingForConnection />

          {modalIsOpen && <AddTransportModal setModalIsOpen={setModalIsOpen} />}
          {scheduleModalIsOpen && (
            <ScheduleModal setModalIsOpen={setScheduleModalIsOpen} />
          )}
        </WithLoading>
      </div>
    </main>
  );
}

export default Transports;

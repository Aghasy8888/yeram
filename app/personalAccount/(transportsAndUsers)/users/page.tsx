'use client';

import { useState } from 'react';
import { WithLoading } from '@/app/components/admin';
import { useAppSelector } from '@/store/store';
import { Checkbox, Ellipse, SaveButton } from '@/app/common';
import {
  getUserTableColumnStyle,
  setTableColumnClasses,
} from '@/helpers/helpers_4';
import tableHeaderColumns, {
  userTableHeaderColsEnglish,
} from '@/data/userTableHeaderColumns';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import users from '@/data/temporary/usersInPersonalAcc';
import DropDown from '@/app/common/DropDown/DropDown';
import roleOptions from '@/data/roleOptions';
import { AddUserModal, UserCardMobile } from '@/app/components/personalAccount';
import useCloseModal from '@/hooks/useCloseModal';

import styles from './page.module.scss';


const userTableColumnStyles = setTableColumnClasses(
  styles,
  userTableHeaderColsEnglish
);

function Users() {
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  const lessThan_1640_Screen = useMediaWidth(windowWidth <= 1640);
  const showAdminSpinner = useAppSelector(
    (state) => state.adminReducer.loading
  );
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const tableHeaderCells = tableHeaderColumns.map((content, index) => (
    <th
      key={index}
      className={getUserTableColumnStyle(userTableColumnStyles, index)}
    >
      {index === 3 && lessThan_1640_Screen ? '' : content}
    </th>
  ));

  const userComponents = users.map((user, index) => {
    // const modalIsOpen = detailsModalIsOpen && detailsModal[transport.id];

    return (
      <tr key={index}>
        <td className={`${styles.column} ${styles.fullName}`}>
          <div className={styles.ellipse}>
            <Ellipse object={user} />
          </div>
          {user.fullName}
        </td>

        <td className={`${styles.column} ${styles.email}`}>{user.email}</td>
        <td className={`${styles.column} ${styles.role}`}>
          <DropDown name="role" options={roleOptions} />
        </td>
        <td className={`${styles.column} ${styles.connection}`}>
          <Checkbox />
        </td>
      </tr>
    );
  });

  const userCards = users.map((user, index) => (
    <div key={index}>
      <UserCardMobile user={user} />
    </div>
  ));

  const handleSave = () => {
    console.log('handle Save Users');
  };

  useCloseModal(modalIsOpen, setModalIsOpen);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading showSpinner={showAdminSpinner}>
          <div className={styles.addUserBtnCtn}>
            <button
              onClick={() => setModalIsOpen(true)}
              className={styles.addTransportOrUserBtn}
            >
              добавить пользователя
            </button>
          </div>

          {lessThan_690_Screen ? (
            <div className={styles.userCardsCtn}>{userCards}</div>
          ) : (
            <table className={styles.table}>
              <tbody>
                <tr>{tableHeaderCells}</tr>
                {userComponents}
              </tbody>
            </table>
          )}

          <SaveButton handleSave={handleSave} />

          {modalIsOpen && <AddUserModal setModalIsOpen={setModalIsOpen} />}
        </WithLoading>
      </div>
    </main>
  );
}

export default Users;

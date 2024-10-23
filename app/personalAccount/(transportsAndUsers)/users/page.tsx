'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { WithLoading } from '@/app/components/admin';
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
import DropDown from '@/app/common/DropDown/DropDown';
import roleOptions from '@/data/roleOptions';
import { AddUserModal, UserCardMobile } from '@/app/components/personalAccount';
import useCloseModal from '@/hooks/useCloseModal';
import useUsersPageEffects from '@/hooks/useUsersPageEffects';
import {
  getRoleDropDownData,
  searchUser,
  setUserRoleWrapper,
} from '@/helpers/helpers_5';
import { MODERATOR } from '@/data/stepConstants';
import useSearch from '@/hooks/useSearch';
import { selectCompanyUsers } from '@/redux/features/company/companySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserRole } from '@/redux/features/auth/authSlice';

import styles from './page.module.scss';

const userTableColumnStyles = setTableColumnClasses(
  styles,
  userTableHeaderColsEnglish
);

function Users() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const windowWidth = useWindowWidth();
  const lessThan_690_Screen = useMediaWidth(windowWidth <= 690);
  const lessThan_1640_Screen = useMediaWidth(windowWidth <= 1640);
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const users: IUserInfo[] | [] = useAppSelector(selectCompanyUsers);
  const [usersToShow, setUsersToShow] = useState<IUserInfo[] | []>(users);
  const userRole = useAppSelector(selectUserRole);
  const addUserDisabled = userRole === MODERATOR;

  useUsersPageEffects();
  useSearch(
    setUsersToShow,
    users as [],
    ['first_name', 'last_name', 'middle_name'],
    searchUser
  );

  const tableHeaderCells = tableHeaderColumns.map((content, index) => (
    <th
      key={index}
      className={getUserTableColumnStyle(userTableColumnStyles, index)}
    >
      {index === 3 && lessThan_1640_Screen ? '' : content}
    </th>
  ));

  const userComponents = usersToShow?.map((user, index) => {
    const { roleDropdownDisabled, defaultUserRoleOption } = getRoleDropDownData(
      userRole,
      user
    );

    const onSetUserRole = (option: IDropDownOption) => {
      setUserRoleWrapper(navigate, dispatch, option, user);
    };

    return (
      <tr key={index}>
        <td className={`${styles.column} ${styles.fullName}`}>
          <div className={styles.ellipse}>
            <Ellipse object={user} />
          </div>
          <span>{user.last_name} </span>
          <span>{user.first_name} </span>
          <span>{user.middle_name}</span>
        </td>

        <td className={`${styles.column} ${styles.email}`}>{user.email}</td>
        <td className={`${styles.column} ${styles.role}`}>
          <DropDown
            name="role"
            options={roleOptions}
            initiallySelectedOption={defaultUserRoleOption}
            makeTheChange={onSetUserRole}
            disabled={roleDropdownDisabled}
          />
        </td>
        <td className={`${styles.column} ${styles.connection}`}>
          <Checkbox defaultChecked />
        </td>
      </tr>
    );
  });

  const userCards = usersToShow?.map((user, index) => {
    const { roleDropdownDisabled, defaultUserRoleOption } = getRoleDropDownData(
      userRole,
      user
    );

    const onSetUserRole = (option: IDropDownOption) => {
      setUserRoleWrapper(navigate, dispatch, option, user);
    };

    return (
      <div key={index}>
        <UserCardMobile
          defaultUserRoleOption={defaultUserRoleOption as IDropDownOption}
          onSetUserRole={onSetUserRole}
          roleDropdownDisabled={roleDropdownDisabled}
          user={user}          
        />
      </div>
    );
  });

  const handleSave = async (e: FormEvent) => {
    console.log('handle Save Users');
  };

  useCloseModal(modalIsOpen, setModalIsOpen);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <WithLoading>
          <div className={styles.addUserBtnCtn}>
            <button
              onClick={() => setModalIsOpen(true)}
              className={`${styles.addTransportOrUserBtn} ${
                addUserDisabled ? styles.disabled : ''
              }`}
              disabled={addUserDisabled}
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

          {/* <SaveButton handleSubmit={handleSave} saveBtnDisabled={false} /> */}

          {modalIsOpen && <AddUserModal setModalIsOpen={setModalIsOpen} />}
        </WithLoading>
      </div>
    </main>
  );
}

export default Users;

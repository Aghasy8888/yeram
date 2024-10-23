'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import * as Yup from 'yup';
import { closeBtn } from '@/public/assets';
import { DropDown, TextInput } from '@/app/common';
import roleOptions from '@/data/roleOptions';
import { addUserValidationSchema } from '@/helpers/validationSchemas';
import useFocusRef from '@/hooks/useFocusRef';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser, IAddUserBody } from '@/redux/features/auth/userService';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';
import idGenerator, { passwordGenerator } from '@/helpers/idGenerator';
import { ADMIN } from '@/data/stepConstants';
import { getRolesBody } from '@/helpers/helpers_5';
import { getFullNameParts } from '@/helpers/helpers_6';

import styles from './AddUserModalStyles.module.scss';

const AddUserModal = ({ setModalIsOpen }: IAddUserModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const companyInDetails: ICompany = useAppSelector(
    selectCompanyInDetails
  ) as ICompany;
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const [userRole, setUserRole] = useState(ADMIN);
  useFocusRef(fullNameInputRef);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setFullNameError(null);
      setEmailError(null);

      await addUserValidationSchema.validate(
        { fullName, email },
        { abortEarly: false }
      );

      const id = idGenerator();
      const roles = getRolesBody(userRole, id) as IRoleInfo;      
      const { first_name, last_name, middle_name, username } = getFullNameParts(fullName);

      const user: IAddUserBody = {
        company: companyInDetails.name as string,
        email,
        username,
        id,
        password: passwordGenerator(),
        roles, 
        first_name,
        last_name,
        middle_name,
      };      

      dispatch(addUser({ data: user, navigate, dispatch }));
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === 'fullName') setFullNameError(err.message);
          if (err.path === 'email') setEmailError(err.message);
        });
      }
    }
  };

  const makeTheChange = (option: IDropDownOption) => {
    setUserRole(option.value)
  };

  const changeFullNameHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFullName(e.target.value);
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <aside className={styles.addUserModal}>
          <button
            className={styles.closeBtn}
            onClick={() => setModalIsOpen(false)}
          >
            <Image
              alt="closeBtn"
              src={closeBtn}
              width={19.5}
              height={19.5}
              priority
            />
          </button>
          <h2 className={styles.title}>Добавление пользователя</h2>

          <form className={styles.addUserForm} onSubmit={handleSubmit}>
            <TextInput
              changeHandler={changeFullNameHandler}
              inputValue={fullName}
              label="ФИО пользователя"
              name="fullName"
              error={fullNameError}
              ref={fullNameInputRef}
              required
            />

            <h3 className={styles.roleTitle}>Роль</h3>
            <DropDown makeTheChange={makeTheChange} name="roleInAddUserModal" options={roleOptions} />

            <TextInput
              changeHandler={changeEmailHandler}
              inputValue={email}
              label="email"
              name="email"
              type="email"
              error={emailError}
              required
            />

            <p>
              На указанный адрес электронной почты будет отправлено письмо с
              паролем для доступа к сервису
            </p>

            <button className={styles.addUserBtn} onClick={handleSubmit}>
              Добавить
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default AddUserModal;

'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { TextInput } from '@/app/common';
import { closeBtn } from '@/public/assets';
import { addTransportValidationSchema } from '@/helpers/validationSchemas';
import useFocusRef from '@/hooks/useFocusRef';

import styles from './AddTransportModalStyles.module.scss';

const AddTransportModal = ({ setModalIsOpen }: IAddTransportModalProps) => {
  const [gosNumber, setGosNumber] = useState('- --- -- (--- RUS)');
  const numberPart = gosNumber.split('(')[0];
  const [gosNumberError, setGosNumberError] = useState<string | null>(null);
  const gosNumberInputRef = useRef<HTMLInputElement>(null);
  useFocusRef(gosNumberInputRef);
  const gosNumberIsValid =
    /^[А-Я]?\s?\d{2,3}\s?[А-Я][А-Я]\s?\(\d{2,3}\s?RUS\)$/;

  const handleGosNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.length > 18) return;

    setGosNumber(inputText);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    handleGosNumberInputChange(e);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setGosNumberError(null);

      await addTransportValidationSchema.validate(
        { gosNumber },
        { abortEarly: false }
      );

      if (gosNumberIsValid.test(gosNumber.toUpperCase()) && numberPart.length <= 9) {
        setModalIsOpen(false);
      } else {
        setGosNumberError('Неверный государственный номер');
      } 

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === 'gosNumber') setGosNumberError(err.message);
        });
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <aside className={styles.addTransportModal}>
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

          <h2 className={styles.title}>Добавление ТС</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <TextInput
              changeHandler={changeHandler}
              inputValue={gosNumber}
              label="Гос. номер"
              name="addTransport"
              placeholder="- --- -- (--- RUS)"
              error={gosNumberError}
              ref={gosNumberInputRef}
              required
            />

            <p>
              Транспортное средство будет добавлено после проверки модератором
            </p>

            <button className={styles.addTransportBtn} onClick={handleSubmit}>
              Добавить
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default AddTransportModal;

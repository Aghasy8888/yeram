'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import { closeBtn } from '@/public/assets';
import { addTransportValidationSchema } from '@/helpers/validationSchemas';
import {
  createCustomMask,
  focusBeforeTwoSpaces,
  isValidGosNumber,
} from '@/helpers/helpers_5';
import useAddTransportModalEffects from '@/hooks/useAddTransportModalEffects';

import styles from './AddTransportModalStyles.module.scss';

const AddTransportModal = ({
  setModalIsOpen,
  gosNumber,
  setGosNumber,
}: IAddTransportModalProps) => {
  const [inputs, setInputs] = useState<NodeListOf<HTMLInputElement> | []>([]);
  const [gosNumberError, setGosNumberError] = useState<string | null>(null);

  useAddTransportModalEffects(inputs[3], setInputs);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGosNumber(e.target.value.toUpperCase());
    
    if (!inputs[3]) return;    
    
    focusBeforeTwoSpaces(inputs[3]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setGosNumberError(null);

      await addTransportValidationSchema.validate(
        { gosNumber },
        { abortEarly: false }
      );

      if (isValidGosNumber(gosNumber)) {
        setModalIsOpen(false);
        setGosNumber('');
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
            <MaskedInput
              mask={createCustomMask(gosNumber)}
              guide={true}
              placeholderChar={'\u2000'}
              placeholder="A 999 AA (999 RUS)"
              value={gosNumber}
              onChange={handleChange}
            />
            <div className={styles.error}>{gosNumberError}</div>

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

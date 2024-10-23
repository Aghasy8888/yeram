'use client';

import useMediaWidth from '@/hooks/useMediaWidth';
import { SelectedPeriod } from '..';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import {
  formatGosNumbers,
  removeLastUndefineds,
  shortenNumbersToShow,
} from '@/helpers';
import { selectSubmittedTransports } from '@/redux/features/transport/transportSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './ SelectedPeriodSectionStyles.module.scss';

const SelectedPeriodSection = ({
  setTableIsOpen,
  tableIsOpen,
  stepValue,
  setStepValue,
  setStartAndEndDate,
  startAndEndDate,
  onChange,
  value,
}: ISelectedPeriodSectionProps) => {
  const windowWidth = useWindowWidth();
  const shouldRenderTransports = useMediaWidth(windowWidth > 690);
  const submittedTransports: ITransport[] = useAppSelector(selectSubmittedTransports);
  const submittedTransportsLength = submittedTransports.length;
  const lengthIsTwoOrThree =
    submittedTransportsLength === 3 || submittedTransportsLength === 2;
  const lastSubmittedTransport =
    submittedTransportsLength > 1
      ? submittedTransports[submittedTransports.length - 1]
      : submittedTransports[0];
  let numbersToShow: (ITransport | undefined)[] = [
    submittedTransportsLength !== 0 ? submittedTransports[0] : undefined,
    submittedTransportsLength > 1 ? submittedTransports[1] : undefined,
    submittedTransportsLength > 2 ? lastSubmittedTransport : undefined,
  ];
  let needMultiPoint = false;

  if (windowWidth < 1640) {
    const definedNumbers = numbersToShow.filter(
      (number) => number !== undefined
    );

    if (definedNumbers.length === 3) {
      needMultiPoint = true;
    }

    numbersToShow = shortenNumbersToShow(
      submittedTransportsLength,
      submittedTransports,
      lastSubmittedTransport
    );
  }

  numbersToShow = removeLastUndefineds(numbersToShow);

  let transportComponents = numbersToShow.map((number, index) => {
    if (index === numbersToShow.length - 1) {
      return (
        <span key={number?.gos_number ? number?.gos_number : index}>
          {lengthIsTwoOrThree ? ' ' : '... ,'}
          {formatGosNumbers(number?.gos_number)}
        </span>
      );
    }

    if (numbersToShow.length === 0) {
      return;
    }

    return (
      <span key={number?.gos_number ? number?.gos_number : index}>
        {formatGosNumbers(number?.gos_number)},{' '}
        {needMultiPoint === true ? '... ,' : ''}
      </span>
    );
  });

  return (
    <section className={styles.selectedPeriodSection}>
      <div className={styles.container}>
        {shouldRenderTransports &&
          (lastSubmittedTransport ? (
            <p className={styles.carNumbers} translate="no">
              {numbersToShow?.length === 1 ? (
                <span>{formatGosNumbers(numbersToShow[0]?.gos_number)}</span>
              ) : (
                transportComponents
              )}
            </p>
          ) : (
            <p className={styles.carNumbers} translate="no">
              <span>Нет активных транспортов</span>
            </p>
          ))}
        <SelectedPeriod
          onChange={onChange}
          value={value}
          startAndEndDate={startAndEndDate}
          setStartAndEndDate={setStartAndEndDate}
          tableIsOpen={tableIsOpen}
          setStepValue={setStepValue}
          stepValue={stepValue}
          setTableIsOpen={setTableIsOpen}
        />
      </div>
    </section>
  );
};

export default SelectedPeriodSection;

'use client';

import Image from 'next/image';
import { useState } from 'react';
import selectedPeriodIcons from '@/data/selectedPeriodIcons';
import { calculatorIcon, selectedPeriod, diagramIcon } from '@/public/assets';
import { DateModal, VideoPlayModal } from '..';
import { DownloadModal } from '@/app/common';
import useCloseModal from '@/hooks/useCloseModal';
import {
  DOWNLOAD_ICON,
} from '@/data/stepConstants';
import useTableOrDiagramEffect from '@/hooks/useTableOrDiagramEffect';
import useSetStepsAutomatically from '@/hooks/useSetStepsAutomatically';
import getDefaultValues from '@/hooks/getDefaultValues';
import { processStartAndEndDate } from '@/helpers/helpers_4';
import { selectShortenedPeriodSelected } from '@/redux/features/other/otherSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './SelectedPeriodStyles.module.scss';

const SelectedPeriod = ({
  setTableIsOpen,
  tableIsOpen,
  stepValue,
  setStepValue,
  setStartAndEndDate,
  startAndEndDate,
  onChange,
  value,
}: ISelectedPeriodProps) => {
  const shortenedPeriodSelected = useAppSelector(selectShortenedPeriodSelected);
  const [tableOrDiagram, setTableOrDiagram] = useState<ITableOrDiagram>({
    tableIcon: calculatorIcon,
    diagramIcon: diagramIcon,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState(false);
  const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);
  const defaultDisabledSteps = getDefaultValues()
    .defaultDisabledSteps as string[];
  const [disabledSteps, setDisabledSteps] =
    useState<string[]>(defaultDisabledSteps);

  useTableOrDiagramEffect(tableIsOpen, setTableOrDiagram);
  
  useSetStepsAutomatically(disabledSteps, stepValue, setStepValue);

  const openInfoTable = () => {
    localStorage.removeItem('diagramIsOpen');
    setTableIsOpen(true);
  };
  const openInfoDiagram = () => {
    localStorage.setItem('diagramIsOpen', 'true');
    setTableIsOpen(false);
  };
  const downloadHandler = () => {
    setDownloadModalIsOpen(true);
  };
  const playHandler = () => {
    setVideoModalIsOpen(true);
  };

  const iconComponents = selectedPeriodIcons.map((icon, index) => {
    let handleClick;
    const isDownloadIcon = icon.name === DOWNLOAD_ICON;

    switch (index) {
      case 0:
        handleClick = openInfoTable;
        icon.src = tableOrDiagram.tableIcon;
        break;
      case 1:
        handleClick = openInfoDiagram;
        icon.src = tableOrDiagram.diagramIcon;
        break;
      case 2:
        handleClick = playHandler;
        break;
      case 3:
        handleClick = downloadHandler;
        break;
    }

    return (
      <button
        key={icon.name}
        className={`${styles.iconBtn} ${
          isDownloadIcon ? styles.downloadIcon : ''
        }`}
        onClick={handleClick}
      >
        <Image
          src={icon.src as string}
          alt={icon.name}
          width={icon.width}
          height={icon.height}
        />
        {isDownloadIcon && downloadModalIsOpen && (
          <DownloadModal stepValue={stepValue} value={value} setDownloadModalIsOpen={setDownloadModalIsOpen} />
        )}
      </button>
    );
  });

  useCloseModal(downloadModalIsOpen, setDownloadModalIsOpen);
  useCloseModal(videoModalIsOpen, setVideoModalIsOpen);

  return (
    <div className={styles.selectedPeriod}>
      <p className={styles.selectedPeriodTitle}>Выбранный период</p>

      <div className={styles.IconsAndDateCtn}>
        {iconComponents}

        <div className={styles.datePicker}>
          <Image
            src={selectedPeriod}
            alt={'selectedPeriod'}
            width={248}
            height={30}
            priority
          />
          <button
            className={styles.clockBtn}
            onClick={() => setModalIsOpen(true)}
          >
            {shortenedPeriodSelected}
          </button>
          <button
            className={styles.dateBtn}
            onClick={() => setModalIsOpen(true)}
          >
              {processStartAndEndDate(startAndEndDate)}
          </button>
        </div>
      </div>

      {modalIsOpen && (
        <DateModal
          setDisabledSteps={setDisabledSteps}
          disabledSteps={disabledSteps}
          setStartAndEndDate={setStartAndEndDate}
          stepValue={stepValue}
          setStepValue={setStepValue}
          setModalIsOpen={setModalIsOpen}
          onChange={onChange}
          value={value}
        />
      )}

      {/* {videoModalIsOpen && <VideoPlayModal startAndEndDate={startAndEndDate} />} */}
    </div>
  );
};

export default SelectedPeriod;

'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { downloadIcon, playIcon } from '@/public/assets';
import { VideoPlayModal } from '..';
import useCloseModal from '@/hooks/useCloseModal';
import { DownloadModal } from '@/app/common';
import { useAppSelector } from '@/store/store';
import { formatGosNumbers } from '@/helpers';
import { getVideos } from '@/store/actions/video/videoActions';
import { getVideoRequestData } from '@/helpers/helpers_3';
import { processStartAndEndDate } from '@/helpers/helpers_4';
import Loading from '@/app/loading';

import styles from './ActiveCarsInfoStyles.module.scss';

const ActiveCarsInfo = ({
  startAndEndDate,
  value,
  stepValue,
}: IActiveCarsInfo) => {
  const navigate = useRouter();
  const dispatch = useDispatch<TDispatch>();
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState(false);
  const [videoModalIsOpen, setVideoModalIsOpen] = useState(false);
  const [downloadModal, setDownloadModal] = useState<{
    [key: string]: boolean;
  }>({});
  const [videosTransportId, setVideosTransportId] = useState('');
  const [videosTransportNumber, setVideosTransportNumber] = useState('');
  const submittedTransports = useAppSelector(
    (state) => state.transportReducer.submittedTransports
  );
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const showVideoSpinner: boolean = useAppSelector(
    (state) => state.videoReducer.loading
  );
  const handleDownload = (car: ITransport) => {
    setDownloadModalIsOpen(true);

    setDownloadModal(() => ({
      [car.gos_number]: true,
    }));
  };

  const handlePlayIconClick = (transportId: string, gosNumber: string) => {
    setVideoModalIsOpen(true);
    setVideosTransportNumber(gosNumber);
    setVideosTransportId(transportId);
    const videoRequestData = getVideoRequestData(value, transportId);

    if (videoRequestData.transport) {
      dispatch(
        getVideos(navigate, videoRequestData as IVideoRequestBody, user)
      );
    }
  };

  const activeTransportsComponents = submittedTransports.map(
    (transport: ITransport, index: number) => (
      <div key={transport.gos_number ? transport.gos_number : index}>
        <hr />
        <div className={styles.infoAndButtonsCtn}>
          <div className={styles.carNumber} translate="no">
            {formatGosNumbers(transport.gos_number)}
          </div>
          <div className={styles.hours}>
            {processStartAndEndDate(startAndEndDate)}
          </div>
          <div
            className={`${styles.IconsCtn} ${styles.downloadIcon}`}
            onClick={() => handleDownload(transport)}
          >
            <Image
              src={downloadIcon}
              alt={'downloadIcon'}
              width={16.084}
              height={15}
              priority={true}
            />
            {downloadModalIsOpen && downloadModal[transport.gos_number] && (
              <DownloadModal
                fromActiveCar
                setDownloadModalIsOpen={setDownloadModalIsOpen}
                value={value}
                stepValue={stepValue}
                transportId={transport.id}
              />
            )}
          </div>
          <div
            className={styles.IconsCtn}
            onClick={() =>
              handlePlayIconClick(transport.id, transport.gos_number)
            }
          >
            <Image
              src={playIcon}
              alt={'playIcon'}
              width={18.182}
              height={13.859}
              priority={true}
            />
          </div>
        </div>

        <div className={styles.enteredExitedNums}>
          <p className={styles.entered}>
            Зашедшие: {transport.report?.totalCameIn}
          </p>
          <p className={styles.exited}>
            вышедшие: {transport.report?.totalCameOut}
          </p>
        </div>
      </div>
    )
  );

  useCloseModal(videoModalIsOpen, setVideoModalIsOpen);
  useCloseModal(downloadModalIsOpen, setDownloadModalIsOpen);

  return (
    <>
    <section className={styles.carsInfo}>
      {activeTransportsComponents}

      {videoModalIsOpen && (
        <VideoPlayModal
          value={value}
          videosTransportId={videosTransportId}
          setVideoModalIsOpen={setVideoModalIsOpen}
          videosTransportNumber={videosTransportNumber}
        />
      )}
    </section>
    {showVideoSpinner && <Loading />}
    </>
    
  );
};

export default ActiveCarsInfo;

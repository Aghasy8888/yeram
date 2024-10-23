'use client';

import Image from 'next/image';
import { downloadByUrl, formatCreationDate } from '@/helpers/helpers_3';
import { formatGosNumbers } from '@/helpers';
import { videoDownloadIcon } from '@/public/assets';
import { MP4 } from '@/data/stepConstants';
import { selectVideos } from '@/redux/features/video/videoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import styles from './VideosStyles.module.scss';

const Videos = ({
  videosTransportNumber,
  setVideoModalIsOpen,
}: IVideosProps) => {
  const dispatch = useAppDispatch();
  const videos: IVideoReport = useAppSelector(selectVideos);
  const videoName = `user`;

  const updatedVideos = videos?.results?.map((video) => {
    const videoCopy = { ...video };
    if (video.link[video.link.length - 1] === '=') {
      videoCopy.link = video.link + videoName;
    }

    return videoCopy;
  });

  const videosWithSaveName = {
    count: videos.count,
    videos: updatedVideos,
  };

  const videoComponents = videosWithSaveName?.videos[0] ? (
    videosWithSaveName.videos.map((video, index) => (
      <div key={index} className={styles.video}>
        <video width={200} height={100} controls>
          <source src={video.link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <p className={styles.carNumber}>
          {formatGosNumbers(videosTransportNumber)}
        </p>
        <p className={styles.dateInfo}>{formatCreationDate(video.dt)}</p>

        <button
          className={styles.downloadBtn}
          onClick={() => {
            setVideoModalIsOpen(true);
            downloadByUrl(
              video.link,
              setVideoModalIsOpen,
              videoName + MP4,
              dispatch
            );
          }}
        >
          <Image
            src={videoDownloadIcon}
            alt={'videoDownloadIcon'}
            width={18}
            height={17}
            priority={true}
          />
        </button>
        <br />
      </div>
    ))
  ) : (
    <p className={styles.noVideos}>Видеофайлы за выбранный период отсутвуют</p>
  );

  return videoComponents;
};

export default Videos;

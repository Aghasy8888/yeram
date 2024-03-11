import { memo } from 'react';
import { PaginatedVideos } from '..';

const VideoPlayModal = ({
  videosTransportNumber,
  setVideoModalIsOpen,
  videosTransportId,
  value,
}: IVideoPlayModalProps) => {

  return (
    <PaginatedVideos
      value={value}
      videosTransportId={videosTransportId}
      videosTransportNumber={videosTransportNumber}
      itemsPerPage={20}
      setVideoModalIsOpen={setVideoModalIsOpen}
    />
  );
};

export default memo(VideoPlayModal);

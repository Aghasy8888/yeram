'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import { Videos } from '..';
import { getVideoRequestData } from '@/helpers/helpers_3';
import { getVideos } from '@/redux/features/video/videoService';
import { closeXBtn } from '@/public/assets';
import {
  selectVideoLoading,
  selectVideos,
} from '@/redux/features/video/videoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserInfo } from '@/redux/features/auth/authSlice';

import './ReactPaginateStyles.scss';
import styles from './PaginatedVideosStyles.module.scss';

const PaginatedVideos = ({
  itemsPerPage,
  setVideoModalIsOpen,
  videosTransportNumber,
  videosTransportId,
  value,
}: IPaginatedVideosProps) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const videos: IVideoReport = useAppSelector(selectVideos);
  const user: IUserInfo | null | undefined = useAppSelector(selectUserInfo);
  const showVideoSpinner = useAppSelector(selectVideoLoading);
  const pageCount = Math.ceil(videos?.count / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;
    const videoRequestData = getVideoRequestData(value, videosTransportId);
    const companyId = user?.company;

    if (companyId && videoRequestData.transport) {
      dispatch(
        getVideos({
          dispatch,
          navigate,
          data: videoRequestData as IVideoRequestBody,
          user,
          page,
        })
      );
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <aside className={styles.videoPlayModal}>
          <button
            className={styles.closeXBtn}
            onClick={() => setVideoModalIsOpen(false)}
          >
            <Image
              src={closeXBtn}
              alt={'closeXBtn'}
              width={30}
              height={30}
              priority={true}
            />
          </button>
          <section className={styles.videosCtn}>
            {showVideoSpinner ? (
              <h1 className={styles.loading}>Loading...</h1>
            ) : (
              <Videos
                setVideoModalIsOpen={setVideoModalIsOpen}
                videosTransportNumber={videosTransportNumber}
              />
            )}
          </section>
          <div className={styles.pagination}>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={(e) => handlePageClick(e)}
              pageRangeDisplayed={2}
              pageCount={pageCount ? pageCount : 1}
              previousLabel="<"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={1}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PaginatedVideos;

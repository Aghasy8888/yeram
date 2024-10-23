import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { getVideos } from './videoService';
import { resetAllState } from '../globalActions';

const initialState: IVideoDefaultState = {
  loading: false,
  videos: { count: 0, results: [] },
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoLoading(state, { payload }) {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getVideos.fulfilled,
        (state, { payload }: { payload: IGetVideosPayload }) => {
          const { jwt, user, videos } = payload;

          const updatedVideos = videos.results.map((video) => {
            const linkWithJwt = video.link.replace(
              /(jsession=)[^&]*/,
              '$1' + user.session_id
            );
            video.link = linkWithJwt;
            return video;
          });

          const updatedVideosObject = {
            count: videos.count,
            results: updatedVideos,
          };

          state.loading = false;
          state.videos = updatedVideosObject;
        }
      )
      .addCase(resetAllState, () => initialState)
      .addMatcher(
        (action) => [getVideos.pending.type].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => [getVideos.rejected.type].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setVideoLoading } = videoSlice.actions;

export const selectVideoLoading = (state: RootState) =>
  state.videoReducer.loading;
export const selectVideos = (state: RootState) => state.videoReducer.videos;

export default videoSlice.reducer;

import * as actionTypes from '../actions/video/videoActionTypes';
import { LOGOUT_SUCCESS, AUTH_LOADING } from '../actions/user/userActionTypes';
import { ERROR } from '../actions/transport/transportActionTypes';

const defaultState: IVideoDefaultState = {
  loading: false,
  videos: { count: 0, results: [] },
};

const videoReducer = (state = defaultState, action: IVideoAction) => {
  const loadingState = {
    ...state,
    loading: true,
  };

  switch (action.type) {
    case LOGOUT_SUCCESS:
      return defaultState;

    case AUTH_LOADING: {
      return {
        ...state,
      };
    }

    case ERROR:
    case actionTypes.DOWNLOAD_VIDEOS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case actionTypes.VIDEO_LOADING:
      return loadingState;

    case actionTypes.GET_VIDEOS_SUCCESS: {

      const updatedVideos = action.videos.results.map((video) => {
        const linkWithJwt = video.link.replace(
          /(jsession=)[^&]*/,
          '$1' + action.user.session_id
        );
        video.link = linkWithJwt;
        return video;
      });

      const updatedVideosObject = {
        count: action.videos.count,
        results: updatedVideos,
      };

      return {
        ...state,
        loading: false,
        videos: updatedVideosObject,
      };
    }

    default:
      return state;
  }
};

export default videoReducer;

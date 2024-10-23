import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import otherReducer from "./features/other/otherSlice";
import companyReducer from "./features/company/companySlice";
import transportReducer from "./features/transport/transportSlice";
import videoReducer from "./features/video/videoSlice";

import logger from 'redux-logger';

export const makeStore = () => {
    return configureStore({
        reducer: {
            authReducer,
            otherReducer,
            companyReducer,
            transportReducer,
            videoReducer,
        },
        middleware: (getDefaultMiddleware) => 
        process.env.NODE_ENV === "development" 
        ? getDefaultMiddleware().concat(logger) 
        : getDefaultMiddleware(),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
import {createStore, applyMiddleware, combineReducers, Store} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './reducers/authReducer';
import transportReducer from './reducers/transportReducer';
import otherReducer from './reducers/otherReducer';
import videoReducer from './reducers/videoReducer';
import adminReducer from './reducers/adminReducer';
import companyReducer from './reducers/companyReducer';

const middlewaresArr = [thunk as ThunkMiddleware<void, IAction>];

if(process.env.NODE_ENV === "development"){
    middlewaresArr.push(logger);
}

const middlewares = applyMiddleware(...middlewaresArr);

const mainReducer: TMainReducer = combineReducers({
    authReducer,
    transportReducer,
    otherReducer,
    videoReducer,
    adminReducer,
    companyReducer,
});

export const useAppSelector: TypedUseSelectorHook<TMainReducer> = useSelector;

export const store: Store<TMainReducer, IAction> = createStore(mainReducer, middlewares);

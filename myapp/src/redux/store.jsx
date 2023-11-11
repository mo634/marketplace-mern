import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const presistConfig = {
    key: "root",
    storage,
    version:1
}

const rootReducer = combineReducers({
    user:userSlice
})

const pReducer = persistReducer(presistConfig,rootReducer)

export const store = configureStore({
    reducer:pReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false,
    }),
})

export const persistor= persistStore(store)
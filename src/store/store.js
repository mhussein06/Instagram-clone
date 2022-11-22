import { compose, applyMiddleware } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import rootReducer from "./root.reducer";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root.saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getPersistConfig } from "redux-deep-persist";


const config = getPersistConfig({
  key: 'root',
  storage,
  whitelist: [
      
      'user.isLoading',  
  ],
  rootReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleware,
].filter(Boolean);
  
const composeSelector =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeSelector(applyMiddleware(...middleWares));
const persistedReducer = persistReducer(config, rootReducer);
// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: 
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }, applyMiddleware(sagaMiddleware))
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware, logger),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

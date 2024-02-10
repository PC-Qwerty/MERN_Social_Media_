import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"; // keep track of the store which is global state which allows access anywhere within the application
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // used to store data in local state (local storage) and only clears when cache is cleared
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer); // maybe like auth details are stored in the local storage using the persistconfig .... and so the persistreducer is combining them under one unit

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
//PersistGate delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux. NOTE: the loading prop can be null or any react instance to show during loading (e.g. a splash screen), for example loading={<Loading />} .
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App /> {/* root component is wrapped with the persistgate to delay that component and retrive the state and save to the redux */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

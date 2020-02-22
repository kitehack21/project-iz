import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules/reducer';

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import logReducer from '../redux/state/logSlice';

const store =  configureStore({
    reducer: {
          log: logReducer,
  },
})

export default store;
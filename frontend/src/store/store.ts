import { configureStore } from '@reduxjs/toolkit';
import appUiReducer from './appUiSlice';
import bookingReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    appUi: appUiReducer,
    booking: bookingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

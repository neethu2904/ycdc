import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BookingField, BookingState } from '../types';

const initialState: BookingState = {
  step: 1,
  branch: 'trivandrum',
  category: 'skin',
  service: 'acne-therapy',
  doctor: 'yogiraj',
  date: '',
  patientName: '',
  patientPhone: '',
  patientEmail: '',
  patientNotes: '',
  bookingId: '',
  isSuccess: false,
  submitting: false
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingForm: (state, action: PayloadAction<Partial<BookingState> | undefined>) => {
      Object.assign(state, initialState, action.payload);
      state.step = action.payload?.step ?? 1;
      state.isSuccess = false;
      state.submitting = false;
      state.bookingId = '';
    },
    setBookingField: (
      state,
      action: PayloadAction<{ field: BookingField; value: string | number }>
    ) => {
      const { field, value } = action.payload;
      (state[field] as string | number) = value;
    },
    setBookingSelection: (state, action: PayloadAction<Partial<Pick<BookingState, 'category' | 'service' | 'doctor' | 'branch'>>>) => {
      Object.assign(state, action.payload);
    },
    nextBookingStep: (state) => {
      state.step += 1;
    },
    previousBookingStep: (state) => {
      state.step = Math.max(1, state.step - 1);
    },
    setBookingSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    setBookingSuccess: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
      state.isSuccess = true;
      state.submitting = false;
    }
  }
});

export const {
  resetBookingForm,
  setBookingField,
  setBookingSelection,
  nextBookingStep,
  previousBookingStep,
  setBookingSubmitting,
  setBookingSuccess
} = bookingSlice.actions;

export default bookingSlice.reducer;

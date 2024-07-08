import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@src/libs/api-data.lib';
import { bookingDataSchema } from '@src/schema/customer.schema';
import z from 'zod'


export const getOngoingBookings = createAsyncThunk(
    'customer/bookings',
    async () => {
      try {
        const res = await apiService.get(`/auth/booking/pending`); // api call
        return res;
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
      }
    }
  );

  export const getCompletedBookings = createAsyncThunk(
    'customer/bookings',
    async () => {
      try {
        const res = await apiService.get(`/auth/booking/all`); // api call
        return res;
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
      }
    }
  );

  export const newBooking = createAsyncThunk(
    'customer/newBooking',
    async (bookingData: z.infer<typeof bookingDataSchema>, { rejectWithValue }) => {
      try {
        // const res = await apiService.post(`/booking/new`, bookingData);
        const res = await apiService.post(`/auth/booking/new`, bookingData);

        return res;
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        return rejectWithValue({ message });
      }
    }
  );
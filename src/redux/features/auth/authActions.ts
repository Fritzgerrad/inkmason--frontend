import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@src/libs/api-data.lib';
import {
  emailFieldSchema,
  loginDataSchema,
  resendAccountTokenSchema,
  resetPasswordSchema,
  verifyAccountSchema,
} from '@src/schema/auth.schema';
import { z } from 'zod';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: z.infer<typeof loginDataSchema>, { rejectWithValue }) => {
    try {
      const res = await apiService.post(`/auth/login`, loginData);
      return res;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return rejectWithValue({ message });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (email: z.infer<typeof emailFieldSchema>, { rejectWithValue }) => {
    try {

      const res = await apiService.get(`/auth/forgot-password?email=${email.email}`); // api call
      return res;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return rejectWithValue({ message });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (
    resetData: z.infer<typeof resetPasswordSchema>,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiService.put(`/auth/reset-password`, resetData);
      return res;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return rejectWithValue({ message });
    }
  }
);

export const verifyUserAccount = createAsyncThunk(
  'auth/verify-account',
  async (
    verifyData: z.infer<typeof verifyAccountSchema>,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiService.post(`/auth/verify`, verifyData);
      return res;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return rejectWithValue({ message });
    }
  }
);
export const resentAccountVerificationToken = createAsyncThunk(
  'auth/resend-account-token',
  async (
    accountIdentifierData: z.infer<typeof resendAccountTokenSchema>,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiService.get(
        `auth/resend-otp?identifier=${accountIdentifierData.identifier}`,
        
      );
      return res;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return rejectWithValue({ message });
    }
  }
);

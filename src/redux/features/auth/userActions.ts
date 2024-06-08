import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@src/libs/api-data.lib';
import {
  newUserAccountSchema,
  newUserDataSchema,
} from '@src/schema/user.schema';
import { z } from 'zod';

export const createUserAccount = createAsyncThunk(
  'user/create-account',
  async (
    userData: z.infer<typeof newUserAccountSchema>,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiService.post(`/auth/register`, userData);
      return res;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      return rejectWithValue({ message });
    }
  }
);

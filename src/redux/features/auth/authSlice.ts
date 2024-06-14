import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id?: number;
  message: string;
  type: 'error' | 'info' | 'success';
}
interface AuthState {
  token: string;
  isAuth: boolean;
  loading: boolean;
  notificaions: Notification[];
}

const initialState: AuthState = {
  token: '',
  isAuth: false,
  loading: false,
  notificaions: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createNotification: (state, actions: PayloadAction<Notification>) => {
      state.notificaions = [actions.payload, ...state.notificaions];
    },
    dismissNotification: (state, actions) => {
      state.notificaions = state.notificaions.filter(
        (note) => note.id !== actions.payload
      );
    },

  },
});

export const { createNotification, dismissNotification} = authSlice.actions;

export default authSlice.reducer;
import {createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '@src/models/Booking';
import type { RootState } from '@src/redux/store';

interface CustomerState {
    completedBookings:Booking[];
    ongoingBooking:Booking | null;
}

const initialState: CustomerState ={
    completedBookings:[],
    ongoingBooking:null
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState,

    reducers: {
        setCompletedBookings: (state, action:PayloadAction<Booking[]>) =>{
            state.completedBookings = action.payload;
        },
        setOngoingBooking: (state, action:PayloadAction<Booking>)=>{
            state.ongoingBooking = action.payload;
        }
    }
})

export const { setCompletedBookings } = customerSlice.actions;
export const selectCompletedBookings = (state: RootState) => state.customer.completedBookings;
export const selectOngoingBookings = (state: RootState) => state.customer.ongoingBooking;

export default customerSlice.reducer;
import { User } from '@src/models/User';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "@src/redux/store";
interface UserState{
    user: User | null;
}
const initialState: UserState ={
    user:null,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        createUser: (state,actions: PayloadAction<User>) =>{
            state.user = actions.payload;
        },
          removeUser: (state) => {
            state.user = null;
        },
    }
});

export const { createUser,removeUser } = userSlice.actions;
export default userSlice.reducer; // reducer function
export const selectUser = (state: RootState) => state.user;
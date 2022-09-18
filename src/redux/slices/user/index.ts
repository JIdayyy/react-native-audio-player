import { signInThunk, signUpThunk } from "./../../thunk/auth";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export type UserPayload = Omit<IUser, "isAuth" | "loading">;

interface IUserState {
    id: string;
    username: string;
    email: string;
    isAuth: boolean;
    loading: boolean;
}

const initialState: IUserState = {
    id: "",
    username: "",
    email: "",
    isAuth: false,
    loading: false,
};

const playerSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut: (state) => {
            state = initialState;
        },
    },
    extraReducers(builder) {
        builder.addCase(signInThunk.fulfilled, (state, action) => {
            state = { ...action.payload, isAuth: true };
        });
        builder.addCase(signInThunk.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(signUpThunk.fulfilled, (state) => {
            state = initialState;
        });
        builder.addCase(signUpThunk.pending, (state) => {
            state.loading = true;
        });
    },
});

export const { signOut } = playerSlice.actions;

export default playerSlice.reducer;

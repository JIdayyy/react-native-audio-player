import { authMeThunk, signInThunk, signUpThunk } from "./../../thunk/auth";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserPayload = Omit<IUserState, "isAuth" | "loading">;

interface IUserState {
  user: { id: string; username: string; email: string };
  isAuth: boolean;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: IUserState = {
  user: { id: "", username: "", email: "" },
  isAuth: false,
  loading: false,
  errorMessage: null,
};

const playerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.user = { ...action.payload.user };
      state.isAuth = true;
    });
    builder.addCase(signInThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = { ...action.payload.user, isAuth: true };
      state.isAuth = true;
    });
    builder.addCase(signUpThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authMeThunk.fulfilled, (state, action) => {
      state.user = { ...action.payload };
      state.isAuth = true;
    });
    builder.addCase(authMeThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authMeThunk.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        state.errorMessage = action.payload;
        state.loading = false;
      }
    });
  },
});

export const { signOut } = playerSlice.actions;

export default playerSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const signInThunk = createAsyncThunk(
    "auth/signIn",
    async (
        payload: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const { data } = await axiosInstance.post("/auth/signin", payload);
            return data;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const signUpThunk = createAsyncThunk(
    "auth/signUp",
    async (
        payload: { email: string; password: string; username: string },
        { rejectWithValue },
    ) => {
        try {
            const { data } = await axiosInstance.post("/auth/signup", payload);
            return data;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import * as SecureStore from "expo-secure-store";

export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, headers } = await axiosInstance.post(
        "/auth/signin",
        payload
      );
      const token = headers["authorization"].split(" ")[1];
      await SecureStore.setItemAsync("token", token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (
    payload: { email: string; password: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, headers } = await axiosInstance.post(
        "/auth/signup",
        payload
      );
      const token = headers["authorization"].split(" ")[1];
      await SecureStore.setItemAsync("token", token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authMeThunk = createAsyncThunk(
  "auth/authMe",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/me");

      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

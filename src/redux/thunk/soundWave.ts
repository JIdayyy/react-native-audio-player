/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const getSoundWave = createAsyncThunk(
  "song/getSoundWave",
  async (songId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<number[]>(
        `/songs/${songId}/soundwave`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default getSoundWave;

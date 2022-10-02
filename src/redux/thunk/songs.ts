/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const getAllSongs = createAsyncThunk(
  "song/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Song[]>("/songs?soundwave=true");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default getAllSongs;

/* eslint-disable consistent-return */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const getAllSongs = createAsyncThunk(
    "song/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get<Song[]>("/songs");
            return data;
        } catch (error) {
            console.log(error);
            rejectWithValue(error);
        }
    },
);

export default getAllSongs;

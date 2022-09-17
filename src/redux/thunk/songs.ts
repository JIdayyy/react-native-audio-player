import axiosInstance from "../../utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllSongs = createAsyncThunk(
    "song/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get<Song[]>("/songs");
            return data;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export default getAllSongs;

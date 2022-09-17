import axiosInstance from "../../utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getSoundWave = createAsyncThunk(
    "song/getSoundWave",
    async (songId: string, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get<number[]>(
                `/songs/${songId}/soundwave`,
            );
            return data;
        } catch (error) {
            console.log(error);
            rejectWithValue(error);
        }
    },
);

export default getSoundWave;

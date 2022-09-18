import { Song } from "../../../interfaces/player";
import { createSlice } from "@reduxjs/toolkit";

interface ISongList {
    focusedSong: Song | null;
}

const initialState: ISongList = {
    focusedSong: null,
};

const songListSlice = createSlice({
    name: "songlist",
    initialState,
    reducers: {
        setFocusedSong: (state, action) => {
            state.focusedSong = action.payload;
        },
    },
});

export const { setFocusedSong } = songListSlice.actions;

export default songListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: ISongList = {
    focusedSong: null,
};

interface ISongList {
    focusedSong: Song | null;
}

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

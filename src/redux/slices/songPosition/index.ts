import { createSlice } from "@reduxjs/toolkit";

interface ISongPositionState {
    position: number;
    duration: number;
}

const initialState: ISongPositionState = {
    position: 0,
    duration: 0,
};

const songPosition = createSlice({
    name: "songPosition",
    initialState,
    reducers: {
        setSongPosition: (state, action) => {
            state.position = action.payload;
        },
        setSongDuration: (state, action) => {
            state.duration = action.payload;
        },
    },
});

export const { setSongDuration, setSongPosition } = songPosition.actions;

export default songPosition.reducer;

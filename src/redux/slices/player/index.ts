import getAllSongs from "../../thunk/songs";
import { createSlice } from "@reduxjs/toolkit";
import getSoundWave from "../../thunk/soundWave";

const initialState: IPlayer = {
    songs: [],
    duration: 0,
    selectedSong: null,
    position: 0,
    showPlaylist: true,
    isPlaying: false,
    songIndex: 0,
    volume: 50,
    soundWave: [],
};

interface IPlayer {
    volume: number;
    songs: Song[];
    duration: number;
    position: number;
    showPlaylist: boolean;
    isPlaying: boolean;
    songIndex: number;
    selectedSong: Song | null;
    soundWave: number[];
}

const counterSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setSongDuration: (state, action) => {
            state.duration = action.payload;
        },
        setSelectedSong: (state, action) => {
            const songId = state.songs.findIndex(
                (song) => song.id === action.payload,
            );
            state.songIndex = songId;
            state.selectedSong = state.songs[songId];
        },
        setSongPosition: (state, action) => {
            state.position = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setShowPlaylist: (state) => {
            state.showPlaylist = !state.showPlaylist;
        },
        setIsOnPlay: (state) => {
            state.isPlaying = true;
        },
        setIsOnPause: (state) => {
            state.isPlaying = false;
        },
        setNextSongIndex: (state) => {
            if (state.songIndex === state.songs.length - 1) {
                state.songIndex = 0;
                state.selectedSong = state.songs[0];
            } else {
                const newIndex = state.songIndex + 1;
                state.songIndex = newIndex;
                state.selectedSong = state.songs[newIndex];
            }
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSongs.fulfilled, (state, action) => {
            state.songs = action.payload || [];
        });
        builder.addCase(getSoundWave.fulfilled, (state, action) => {
            state.soundWave = action.payload || [];
        });
    },
});

export const {
    setVolume,
    setNextSongIndex,
    setSongDuration,
    setSelectedSong,
    setSongPosition,
    setDuration,
    setShowPlaylist,
    setIsOnPause,
    setIsOnPlay,
} = counterSlice.actions;

export default counterSlice.reducer;

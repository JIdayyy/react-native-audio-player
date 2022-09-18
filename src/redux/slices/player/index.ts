import { createSlice } from "@reduxjs/toolkit";
import getAllSongs from "../../thunk/songs";
import getSoundWave from "../../thunk/soundWave";

interface IPlayer {
    volume: number;
    songs: Song[];
    showPlaylist: boolean;
    isPlaying: boolean;
    songIndex: number;
    selectedSong: Song | null;
    soundWave: number[];
    loaders: {
        songs: boolean;
        soundWave: boolean;
    };
}

const initialState: IPlayer = {
    songs: [],
    selectedSong: null,
    showPlaylist: true,
    isPlaying: false,
    songIndex: 0,
    volume: 50,
    soundWave: [],
    loaders: {
        songs: false,
        soundWave: false,
    },
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setSelectedSong: (state, action) => {
            const songId = state.songs.findIndex(
                (song) => song.id === action.payload,
            );
            state.songIndex = songId;
            state.selectedSong = state.songs[songId];
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
            state.loaders.songs = false;
            state.songs = action.payload || [];
        });
        builder.addCase(getAllSongs.pending, (state) => {
            state.loaders.songs = true;
        });
        builder.addCase(getSoundWave.fulfilled, (state, action) => {
            state.loaders.soundWave = false;
            state.soundWave = action.payload || [];
        });
        builder.addCase(getSoundWave.pending, (state) => {
            state.loaders.soundWave = true;
        });
    },
});

export const {
    setVolume,
    setNextSongIndex,
    setSongDuration,
    setSelectedSong,
    setShowPlaylist,
    setIsOnPause,
    setIsOnPlay,
} = playerSlice.actions;

export default playerSlice.reducer;

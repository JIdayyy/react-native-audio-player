import { usePlaybackObject } from "./../src/context/playbackObjectContext";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useAppDispatch, useAppSelector } from "./../src/redux/store";
import {
    setIsOnPlay,
    setNextSongIndex,
    setVolume,
} from "../src/redux/slices/player";
import { useEffect } from "react";
import getSoundWave from "../src/redux/thunk/soundWave";

const usePlayer = () => {
    const { playbackObject } = usePlaybackObject();
    const dispatch = useAppDispatch();
    const { songs, songIndex, selectedSong, volume } = useAppSelector(
        (state) => state.rootReducer.player,
    );

    const play = () => {
        dispatch(setIsOnPlay());
    };

    const setNextSong = async () => {
        dispatch(setNextSongIndex());
    };

    const loadSong = async (isPlaying?: boolean) => {
        if (selectedSong && playbackObject !== null) {
            await playbackObject?.unloadAsync();
            playbackObject.pauseAsync();
            playbackObject?.loadAsync(
                {
                    uri: songs[songIndex].link,
                },
                { shouldPlay: isPlaying && true },
            );
        }
    };

    const setPlaybackVolume = async (volume: number) => {
        await playbackObject?.setVolumeAsync(volume / 100);
    };

    const handleVolume = (volume: number) => {
        dispatch(setVolume(volume));
    };

    useEffect(() => {
        setPlaybackVolume(volume);
    }, [volume]);

    useEffect(() => {
        if (songs.length) {
            loadSong(true);
        }
    }, [songIndex]);

    useEffect(() => {
        if (selectedSong) {
            dispatch(getSoundWave(selectedSong?.id));
        }
    }, [selectedSong]);

    const handleAudioPlay = async () => {
        if (playbackObject !== null) {
            await playbackObject?.playAsync();
        }
        // if (selectedSong) {
        //     await playbackObject?.loadAsync(
        //         { uri: selectedSong.link },
        //         { shouldPlay: true },
        //     );
        // }
    };

    const handlePause = async () => {
        await playbackObject?.pauseAsync();
    };

    return {
        handleVolume,
        handlePause,
        handleAudioPlay,
        selectedSong,
        songIndex,
        playbackObject,
        volume,
        songs,
        setNextSong,
        play,
    };
};

export default usePlayer;

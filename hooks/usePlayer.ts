import { usePlaybackObject } from "./../src/context/playbackObjectContext";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useAppDispatch, useAppSelector } from "./../src/redux/store";
import {
    setIsOnPlay,
    setNextSongIndex,
    setVolume,
} from "../src/redux/slices/player";
import { useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import getSoundWave from "../src/redux/thunk/soundWave";

const usePlayer = () => {
    const { playbackObject, setPlaybackObject } = usePlaybackObject();
    const dispatch = useAppDispatch();
    const { songs, songIndex, selectedSong, volume } = useAppSelector(
        (state) => state.rootReducer.player,
    );

    const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>();

    const play = () => {
        dispatch(setIsOnPlay());
    };

    const setNextSong = async () => {
        dispatch(setNextSongIndex());
    };

    const loadSong = async (isPlaying?: boolean) => {
        if (selectedSong && playbackObject !== null) {
            const status = playbackObject;
            status?.unloadAsync();
            status?.loadAsync(
                {
                    uri: songs[songIndex].link,
                },
                { shouldPlay: isPlaying && true },
            );

            setPlaybackStatus(status);
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
            setPlaybackStatus(null);
            loadSong(true);
        }
    }, [songIndex]);

    useEffect(() => {
        if (selectedSong) {
            console.log("get soundwave");
            dispatch(getSoundWave(selectedSong?.id));
        }
    }, [selectedSong]);

    const handleAudioPlay = async () => {
        if (!playbackObject?._loaded && playbackObject) {
            const status = await playbackObject.loadAsync(
                { uri: songs[0].link },
                { shouldPlay: false },
            );
            setPlaybackStatus(status);
        }
        if (playbackStatus !== null) {
            await playbackObject?.playAsync();
        }
        if (selectedSong) {
            await Audio.Sound.createAsync(
                { uri: selectedSong.link },
                { shouldPlay: true },
            );
        }
    };

    const handlePause = async () => {
        const status = await playbackObject?.pauseAsync();
        if (status) {
            return setPlaybackStatus(status);
        }
    };

    return {
        handleVolume,
        handlePause,
        handleAudioPlay,
        selectedSong,
        songIndex,
        playbackObject,
        volume,
        playbackStatus,
        songs,
        setNextSong,
        play,
    };
};

export default usePlayer;

import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    setIsOnPause,
    setIsOnPlay,
    setNextSongIndex,
    setVolume,
} from "../redux/slices/player";
import { setSongDuration, setSongPosition } from "../redux/slices/songPosition";
import { useAppDispatch, useAppSelector } from "../redux/store";
import getSoundWave from "../redux/thunk/soundWave";

type PlaybackObjectContextType = {
    playbackObject: Audio.Sound | null;
    setPlaybackObject: Dispatch<SetStateAction<Audio.Sound | null>>;
    methods: {
        play: () => void;
        handleAudioPlay: () => void;
        handlePause: () => void;
        setNextSong: () => void;
        handleVolume: (volume: number) => void;
    };
};

function isStatusSuccess(
    status: AVPlaybackStatus,
): status is AVPlaybackStatusSuccess {
    return (status as AVPlaybackStatusSuccess) !== undefined;
}

const PlaybackObjectContext = createContext<PlaybackObjectContextType | null>(
    null,
);

const PlaybackObjectProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(
        null,
    );
    const { songs, songIndex, selectedSong, volume } = useAppSelector(
        (state) => state.rootReducer.player,
    );
    const dispatch = useAppDispatch();

    const createAsync = async () => {
        const sound = new Audio.Sound();
        sound._onPlaybackStatusUpdate = (status) => {
            if (isStatusSuccess(status)) {
                if (status.isPlaying) {
                    console.log("is playing");
                    dispatch(setIsOnPlay());
                }
                if (status.didJustFinish) {
                    console.log("song end");
                    dispatch(setNextSongIndex());
                }
                if (!status.isPlaying) {
                    console.log("song paused");
                    dispatch(setIsOnPause());
                }
                dispatch(setSongDuration(status.durationMillis));
                dispatch(setSongPosition(status.positionMillis));
            }
        };
        setPlaybackObject(sound);
    };

    useEffect(() => {
        if (playbackObject === null && songs.length) {
            createAsync();
        }
        () => {
            setPlaybackObject(null);
        };
    }, [songs]);

    const play = () => {
        dispatch(setIsOnPlay());
    };

    const setNextSong = async () => {
        dispatch(setNextSongIndex());
    };

    const loadSong = async (isPlaying?: boolean) => {
        playbackObject?.unloadAsync();
        if (selectedSong && playbackObject !== null) {
            playbackObject?.unloadAsync();

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
        playbackObject?.unloadAsync();

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
    };

    const handlePause = async () => {
        await playbackObject?.pauseAsync();
    };

    return (
        <PlaybackObjectContext.Provider
            value={{
                playbackObject,
                setPlaybackObject,
                methods: {
                    play,
                    handleAudioPlay,
                    handlePause,
                    setNextSong,
                    handleVolume,
                },
            }}
        >
            {playbackObject && children}
        </PlaybackObjectContext.Provider>
    );
};

export default PlaybackObjectProvider;

export const usePlaybackObject = (): PlaybackObjectContextType => {
    const context = useContext(PlaybackObjectContext);

    if (context === null) {
        throw new Error(
            "usePlaybackObject must be used within a PlaybackObjectProvider",
        );
    }

    return context;
};

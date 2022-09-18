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
import { useDispatch } from "react-redux";
import {
    setIsOnPause,
    setIsOnPlay,
    setNextSongIndex,
} from "../redux/slices/player";
import { setSongDuration, setSongPosition } from "../redux/slices/songPosition";
import { useAppSelector } from "../redux/store";

type PlaybackObjectContextType = {
    playbackObject: Audio.Sound | null;
    setPlaybackObject: Dispatch<SetStateAction<Audio.Sound | null>>;
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
    const { songs } = useAppSelector((state) => state.rootReducer.player);
    const initialStatus = {
        shouldPlay: false,
    };
    const dispatch = useDispatch();

    const createAsync = async (link) =>
        await Audio.Sound.createAsync(
            {
                uri: link,
            },
            initialStatus,
            onPlaybackStatusUpdate,
        ).then((res) => {
            setPlaybackObject(res.sound);
        });

    useEffect(() => {
        if (!playbackObject && songs.length) {
            createAsync(songs[0].link);
        }
    }, [songs]);

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (isStatusSuccess(status)) {
            if (status.isPlaying) {
                dispatch(setIsOnPlay());
            }
            if (!status.isPlaying) {
                dispatch(setIsOnPause());
            }
            dispatch(setSongDuration(status.durationMillis));
            dispatch(setSongPosition(status.positionMillis));
        }

        // if (status) {
        //     if (status.didJustFinish) {
        //         dispatch(setNextSongIndex());
        //     }
        //     if (status.isLoaded) {
        //         dispatch(setSongDuration(status.durationMillis));
        //         dispatch(setSongPosition(status.positionMillis));
        //     }
        // }
    };

    return (
        <PlaybackObjectContext.Provider
            value={{ playbackObject, setPlaybackObject }}
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

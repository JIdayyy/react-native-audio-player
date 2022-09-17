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
    setNextSongIndex,
    setSongDuration,
    setSongPosition,
} from "../redux/slices/player";
import { useAppSelector } from "../redux/store";

type PlaybackObjectContextType = {
    playbackObject: Audio.Sound | null;
    setPlaybackObject: Dispatch<SetStateAction<Audio.Sound | null>>;
};

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
        shouldPlay: true,
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

    const onPlaybackStatusUpdate = (status: any) => {
        dispatch(setSongPosition(status.positionMillis));
        dispatch(setSongDuration(status.durationMillis));
        if (
            status.positionMillis === status.durationMillis &&
            status.positionMillis !== 0 &&
            status.positionMillis
        ) {
            dispatch(setNextSongIndex());
        }
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

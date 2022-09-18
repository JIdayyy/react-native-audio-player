import { SafeAreaView } from "react-native-safe-area-context";
import Player from "../components/player";
import PlaybackObjectProvider from "../src/context/playbackObjectContext";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<"Home">): JSX.Element {
    return (
        <PlaybackObjectProvider>
            <Player />
        </PlaybackObjectProvider>
    );
}

import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Player from "../components/player";
import { Text, View } from "../components/Themed";
import PlaybackObjectProvider from "../src/context/playbackObjectContext";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<"TabOne">): JSX.Element {
    return (
        <PlaybackObjectProvider>
            <Player />
        </PlaybackObjectProvider>
    );
}

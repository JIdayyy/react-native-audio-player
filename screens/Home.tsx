import Player from "../components/player";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<"Home">): JSX.Element {
    return <Player />;
}

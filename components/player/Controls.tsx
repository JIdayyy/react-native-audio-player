import { Flex } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../../src/redux/store";
import { usePlaybackObject } from "../../src/context/playbackObjectContext";

export default function Controls(): JSX.Element {
    const {
        methods: { handleAudioPlay, setNextSong, handlePause },
    } = usePlaybackObject();

    const { isPlaying } = useAppSelector((state) => state.rootReducer.player);
    return (
        <Flex direction="column" position="relative" w="100%" h="100px">
            <Flex
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                w="full"
                h="full"
            >
                <Icon
                    onPress={setNextSong}
                    name="backward"
                    size={30}
                    color="white"
                />
                {!isPlaying ? (
                    <Flex
                        style={style.shadow}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="white"
                        rounded="full"
                        width={60}
                        height={60}
                    >
                        <Icon
                            onPress={handleAudioPlay}
                            name="play"
                            size={30}
                            color="black"
                        />
                    </Flex>
                ) : (
                    <Flex
                        style={style.shadow}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="white"
                        rounded="full"
                        width={60}
                        height={60}
                    >
                        <Icon
                            onPress={handlePause}
                            name="pause"
                            size={30}
                            color="black"
                        />
                    </Flex>
                )}
                <Icon
                    onPress={setNextSong}
                    name="forward"
                    size={30}
                    color="white"
                />
            </Flex>
        </Flex>
    );
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: "#FFFFFF",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 30,
        elevation: 10,
    },
});

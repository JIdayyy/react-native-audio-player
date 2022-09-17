import { Box, Flex, Slider } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import usePlayer from "../../hooks/usePlayer";
import { LinearGradient } from "expo-linear-gradient";
import { usePlaybackObject } from "../../src/context/playbackObjectContext";
import { StyleSheet } from "react-native";

export default function Controls(): JSX.Element {
    const { handleAudioPlay, setNextSong, handlePause } = usePlayer();

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
                <Icon
                    onPress={handlePause}
                    name="pause"
                    size={30}
                    color="white"
                />
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
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
    },
});

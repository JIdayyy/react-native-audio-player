import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Flex, Image, Text, Pressable } from "native-base";
import { useAppSelector } from "../../src/redux/store";
import Icon from "react-native-vector-icons/FontAwesome";
import usePlayer from "../../hooks/usePlayer";

export default function SongPreview(): JSX.Element {
    const { selectedSong, isPlaying } = useAppSelector(
        (state) => state.rootReducer.player,
    );
    const { handlePause } = usePlayer();
    const navigation = useNavigation();

    return (
        <Pressable width="full" onPress={() => navigation.navigate("Home")}>
            <Flex
                direction="row"
                w="full"
                p={3}
                justifyContent="space-between"
                alignItems="center"
                borderTopRadius={30}
                backgroundColor="white"
            >
                <Flex direction="row">
                    {selectedSong?.album.picture ? (
                        <Image
                            width="60px"
                            height="60px"
                            rounded={10}
                            alt="album cover"
                            src={selectedSong?.album?.picture}
                        />
                    ) : (
                        <Image
                            width="60px"
                            height="60px"
                            rounded={10}
                            source={require("./cat.png")}
                            alt="album cover placeholder"
                        />
                    )}
                    <Flex ml={5} justifyContent="center" alignItems="center">
                        <Text
                            w="full"
                            isTruncated
                            fontWeight="bold"
                            fontSize={15}
                            color="#171C26"
                        >
                            {selectedSong?.title}
                        </Text>
                        <Text
                            w="full"
                            isTruncated
                            fontSize={10}
                            color="#171C26"
                        >
                            {selectedSong?.artist.name}
                        </Text>
                    </Flex>
                </Flex>
                <Flex
                    mr={3}
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#171C26"
                    rounded="full"
                    w={10}
                    h={10}
                >
                    {!isPlaying ? (
                        <Foundation name="play" size={30} color="white" />
                    ) : (
                        <Icon
                            onPress={handlePause}
                            name="pause"
                            size={30}
                            color="black"
                        />
                    )}
                </Flex>
            </Flex>
        </Pressable>
    );
}

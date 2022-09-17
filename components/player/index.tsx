import { Flex, Slider, Text, Image, Box } from "native-base";
import Controls from "./Controls";
import { useAppSelector } from "../../src/redux/store";
import SoundWave from "./SoundWave";

export default function Player(): JSX.Element {
    const { selectedSong } = useAppSelector(
        (state) => state.rootReducer.player,
    );

    return (
        <Flex
            w="full"
            h="100%"
            direction="column"
            backgroundColor="#171C26"
            justifyContent="space-around"
            alignItems="center"
            position="relative"
        >
            {selectedSong?.album.picture ? (
                <Image
                    rounded={40}
                    size={80}
                    src={selectedSong?.album?.picture || ""}
                    alt="album cover"
                />
            ) : (
                <Image
                    rounded={40}
                    size={80}
                    source={require("./cat.png")}
                    alt="album cover placeholder"
                />
            )}

            <Text fontSize={20} fontWeight="bold" color="white">
                {selectedSong?.title}
            </Text>
            <Text fontSize={20} fontWeight="bold" color="white">
                {selectedSong?.artist.name}
            </Text>
            <SoundWave />
            <Controls />
        </Flex>
    );
}

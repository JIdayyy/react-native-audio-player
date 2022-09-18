import { Flex, Text, Image, Box } from "native-base";
import Controls from "./Controls";
import { useAppSelector } from "../../src/redux/store";
import SoundWave from "./SoundWave";
import HMSTime from "./HMSTime";
import { Foundation } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function Player(): JSX.Element {
  const { selectedSong } = useAppSelector((state) => state.rootReducer.player);

  return (
    <Flex
      paddingTop={10}
      flex={1}
      w="full"
      h="full"
      direction="column"
      backgroundColor="#171C26"
      justifyContent="space-around"
      alignItems="center"
      position="relative"
    >
      <Flex direction="row" w="90%" justifyContent="space-between">
        <Foundation name="arrow-left" size={30} color="white" />
        <Text color="white">Now Playing</Text>
        <Box />
      </Flex>

      <Box width={80} rounded={30} height={80} style={style.shadow}>
        {selectedSong?.album.picture ? (
          <Image
            rounded={30}
            width={80}
            height={80}
            src={selectedSong?.album?.picture || ""}
            alt="album cover"
            style={style.shadow}
          />
        ) : (
          <Image
            rounded={30}
            width={80}
            height={80}
            source={require("./cat.png")}
            alt="album cover placeholder"
            style={style.shadow}
          />
        )}
      </Box>

      <Text fontSize={20} fontWeight="bold" color="white">
        {selectedSong?.title}
      </Text>
      <Text fontSize={10} fontWeight="thin" color="gray.400">
        {selectedSong?.artist.name}
      </Text>
      <SoundWave />
      <HMSTime />
      <Controls />
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
    shadowOpacity: 0.4,
    shadowRadius: 30,

    elevation: 30,
  },
});

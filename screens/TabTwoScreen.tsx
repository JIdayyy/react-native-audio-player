import { Foundation } from "@expo/vector-icons";
import { Box, Flex, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import SongPreview from "../components/preview";
import SongList from "../components/songlist";
import SongDetails from "../components/songlist/SongDetails";
import PlaybackObjectProvider from "../src/context/playbackObjectContext";

export default function TabTwoScreen(): JSX.Element {
  return (
    <Flex
      paddingTop={10}
      backgroundColor="#171C26"
      position="relative"
      w="full"
      h="full"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex my={5} direction="row" w="90%" justifyContent="space-between">
        <Foundation name="arrow-left" size={30} color="white" />
        <Text color="white"></Text>
        <Box />
      </Flex>
      <SongDetails />
      <SongList />
      <SongPreview />
    </Flex>
  );
}

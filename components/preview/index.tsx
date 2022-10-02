import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Flex, Image, Text, Pressable } from "native-base";
import { useAppSelector } from "../../src/redux/store";
import Icon from "react-native-vector-icons/FontAwesome";
import { usePlaybackObject } from "../../src/context/playbackObjectContext";
import TextTicker from "react-native-text-ticker";

export default function SongPreview(): JSX.Element {
  const isPlaying = useAppSelector(
    (state) => state.rootReducer.player.isPlaying
  );
  const selectedSong = useAppSelector(
    (state) => state.rootReducer.player.selectedSong
  );
  const {
    methods: { handlePause, handleAudioPlay },
  } = usePlaybackObject();

  const navigation = useNavigation();

  return (
    <Pressable width="full" onPress={() => navigation.goBack()}>
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
          <Flex
            width="2/3"
            ml={5}
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* <Text
              w="full"
              isTruncated
              fontWeight="bold"
              fontSize={15}
              color="#171C26"
            > */}
            <TextTicker
              style={{ fontSize: 15, fontWeight: "bold" }}
              duration={10000}
              loop
              animationType="auto"
              repeatSpacer={20}
            >
              {selectedSong?.title}
            </TextTicker>
            {/* </Text> */}
            <Text w="full" isTruncated fontSize={10} color="#171C26">
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
            <Foundation
              onPress={handleAudioPlay}
              name="play"
              size={25}
              color="white"
            />
          ) : (
            <Icon onPress={handlePause} name="pause" size={20} color="white" />
          )}
        </Flex>
      </Flex>
    </Pressable>
  );
}

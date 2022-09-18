import { Box, Button, Flex, Image, Text } from "native-base";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../src/redux/store";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { setSelectedSong } from "../../src/redux/slices/player";

export default function SongDetails(): JSX.Element {
  const { selectedSong } = useAppSelector((state) => state.rootReducer.player);

  const dispatch = useAppDispatch();

  const { focusedSong } = useAppSelector((state) => state.rootReducer.songList);

  const onPreview = focusedSong ? focusedSong : selectedSong;

  return (
    <Flex w="90%">
      <Flex w="full" direction="row">
        <Box style={style.imageShadow}>
          <Image
            rounded={30}
            alt="focused album picture"
            src={onPreview?.album.picture || ""}
            size={150}
          />
        </Box>
        <Flex p={5} w="full">
          <Text w="50%" noOfLines={2} color="white" fontSize={25}>
            {onPreview?.title}
          </Text>
          <Text color="gray.400" fontSize={17}>
            {onPreview?.album.title}
          </Text>
        </Flex>
      </Flex>
      <Flex my={5} direction="row" justifyContent="space-between">
        <Button
          onPress={() => dispatch(setSelectedSong(focusedSong?.id))}
          style={style.buttonsShadow}
          w="45%"
          mr={2}
          backgroundColor="white"
        >
          <Flex flexDirection="row">
            <EvilIcons name="play" size={24} color="black" />
            <Text>Play</Text>
          </Flex>
        </Button>
        <Button w="45%" ml={2} backgroundColor="#0B0D10" opacity="0.5">
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
            <Ionicons name="shuffle-outline" size={24} color="white" />
            <Text color="white">Shuffle</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}

const style = StyleSheet.create({
  buttonsShadow: {
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 30,
  },
  imageShadow: {
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
});

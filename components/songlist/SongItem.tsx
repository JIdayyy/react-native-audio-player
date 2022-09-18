import { Flex, Text } from "native-base";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useAppDispatch } from "../../src/redux/store";
import { setFocusedSong } from "../../src/redux/slices/songlist";
import { Pressable } from "react-native";

interface IProps {
    song: Song;
    index: number;
}

export default function SongItem({ song, index }: IProps): JSX.Element {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setFocusedSong(song));
    };

    return (
        <Flex
            direction="row"
            justifyContent="space-between"
            p={3}
            w="full"
            my={1}
        >
            <Flex direction="row" justifyContent="center" alignItems="center">
                <Text mr={4} fontSize={15} color="white">
                    0{index + 1}
                </Text>
                <Pressable onPress={handleClick}>
                    <Flex>
                        <Text fontSize={12} color="white">
                            {song.title}
                        </Text>
                        <Flex direction="row">
                            <Text mr={2} fontSize={10} color="gray.400">
                                {song.artist.name}
                            </Text>
                            <Text fontSize={10} color="gray.400">
                                {song.duration.split(".")[0]}
                            </Text>
                        </Flex>
                    </Flex>
                </Pressable>
            </Flex>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
        </Flex>
    );
}

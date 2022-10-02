import Upload from "./upload";
import { useNavigation } from "@react-navigation/native";
import { Button, Flex, VStack } from "native-base";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";
import axiosInstance from "../src/utils/axiosInstance";
import ControlledInput from "../components/UI/ControlledInput";

export default function UploadScreen(): JSX.Element {
  const navigation = useNavigation();
  const { register, handleSubmit, control } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    axiosInstance
      .post("/songs/youtube", {
        url: data.youtubeUrl,
        albumName: data.album,
        artistName: data.artist,
        songTitle: data.title,
      })
      .then((res) => setIsLoading(false));
  };

  return (
    <Flex
      paddingTop={10}
      backgroundColor="#171C26"
      position="relative"
      w="full"
      h="full"
      justifyContent="center"
      alignItems="center"
    >
      <VStack w="full" px={5} py={20} space={5}>
        <ControlledInput
          name="youtubeUrl"
          icon={<></>}
          placeholder="Youtube Url"
          control={control}
        />
        <ControlledInput
          name="title"
          icon={<></>}
          placeholder="Title"
          control={control}
        />
        <ControlledInput
          name="artist"
          icon={<></>}
          placeholder="Artist"
          control={control}
        />
        <ControlledInput
          name="album"
          icon={<></>}
          placeholder="Album"
          control={control}
        />
        <Button w="full" my={10} onPress={handleSubmit(onSubmit)}>
          SUBMIT
        </Button>
      </VStack>
    </Flex>
  );
}

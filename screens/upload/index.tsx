import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, Flex, Input, Text, View } from "native-base";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import ControlledInput from "../../components/UI/ControlledInput";
import { FieldValues, useForm } from "react-hook-form";
import axiosInstance from "../../src/utils/axiosInstance";

export default function Upload(): JSX.Element {
  const navigation = useNavigation();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: FieldValues) => {
    axiosInstance.post("/songs/youtube", { url: data.youtubeUrl });
  };

  return (
    <Flex w="full" h="full" p={10}>
      <Button
        my={10}
        onPress={() =>
          navigation.navigate("Root", {
            screen: "Upload",
            params: {
              screen: "Files",
              params: {
                screen: "Media",
              },
            },
          })
        }
      >
        FILES
      </Button>
      <ControlledInput
        name="youtubeUrl"
        icon={<></>}
        placeholder="Youtube Url"
        control={control}
      />
      <Button my={10} onPress={handleSubmit(onSubmit)}>
        SUBMIT
      </Button>
    </Flex>
  );
}

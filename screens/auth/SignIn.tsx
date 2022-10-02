import {
  Button,
  Flex,
  Input,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "native-base";
import { useAppDispatch } from "../../src/redux/store";
import { useForm, FieldValues } from "react-hook-form";
import { ImageBackground, Platform, StyleSheet } from "react-native";
import ControlledInput from "../../components/UI/ControlledInput";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { signInThunk, signUpThunk } from "../../src/redux/thunk/auth";

export default function SignInScreen({ navigation }): JSX.Element {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FieldValues) => {
    dispatch(
      signInThunk({
        password: data.password,
        email: data.email,
      })
    );
  };

  const handlePress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Flex w="full" h="full">
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require("./auth-bg.png")}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        <Flex justifyContent="center" w="full" h="full" p={5}>
          <Text w="full" my={1} fontSize={55} color="white">
            Sign In to Wildify
          </Text>
          <Text w="full" mb={10} fontSize={20} color="gray.400">
            to beggin your journey
          </Text>
          <VStack space={5}>
            <ControlledInput
              icon={
                <Entypo
                  style={{ marginRight: 10 }}
                  name="email"
                  size={15}
                  color="gray"
                />
              }
              control={control}
              name="email"
              placeholder="Email"
            />

            <ControlledInput
              icon={
                <FontAwesome5
                  style={{ marginRight: 10 }}
                  name="key"
                  size={15}
                  color="gray"
                />
              }
              control={control}
              name="password"
              placeholder="Password"
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              variant="unstyled"
              backgroundColor="white"
              color="#171C26"
              my={10}
            >
              Sign In
            </Button>
            <Text onPress={handlePress} fontSize={12} color="white">
              No account yet ? Sign up here !
            </Text>
          </VStack>
        </Flex>
      </KeyboardAvoidingView>
    </Flex>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
});

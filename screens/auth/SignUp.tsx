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

export default function SignUpScreen({ navigation }): JSX.Element {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FieldValues) => {
    dispatch(
      signUpThunk({
        username: data.username,
        password: data.password,
        email: data.email,
      })
    );
  };

  const handlePress = () => {
    navigation.navigate("SignIn");
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
            Sign Up to Wildify
          </Text>
          <Text w="full" mb={10} fontSize={20} color="gray.400">
            to start listening and share your favorites songs
          </Text>
          <VStack space={5}>
            <ControlledInput
              icon={
                <AntDesign
                  style={{ marginRight: 10 }}
                  name="user"
                  size={15}
                  color="gray"
                />
              }
              control={control}
              name="username"
              placeholder="Username"
            />

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
              name="password-confirmation"
              placeholder="Password confirmation"
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              variant="unstyled"
              backgroundColor="white"
              color="#171C26"
              my={10}
            >
              Sign Up
            </Button>
            <Text onPress={handlePress} fontSize={12} color="white">
              Allready got an account ? Sign in here !
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

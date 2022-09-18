import { Button, Flex, Input, KeyboardAvoidingView, VStack } from "native-base";
import { useAppDispatch } from "../../src/redux/store";
import { AuthTabScreenProps, RootTabScreenProps } from "../../types";
import { useForm, FieldValues } from "react-hook-form";
import { Platform, StyleSheet } from "react-native";
import ControlledInput from "../../components/UI/ControlledInput";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }): JSX.Element {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, control } = useForm();

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <Flex backgroundColor="#171C26" w="full" h="full">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                flex={1}
            >
                <Flex justifyContent="center" w="full" h="full" p={5}>
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
                    </VStack>
                </Flex>
            </KeyboardAvoidingView>
        </Flex>
    );
}

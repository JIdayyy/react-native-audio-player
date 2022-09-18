import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import Library from "../screens/TabTwoScreen";
import {
    AuthStackParamList,
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useAppSelector } from "../src/redux/store";
import SignUpScreen from "../screens/auth/SignUp";

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}): JSX.Element {
    const { isAuth } = useAppSelector((state) => state.rootReducer.user);

    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            {isAuth ? <RootNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator(): JSX.Element {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="SignIn"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
}

function RootNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />
            <RootStack.Group screenOptions={{ presentation: "modal" }}>
                <RootStack.Screen name="Modal" component={ModalScreen} />
            </RootStack.Group>
        </RootStack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#171C26",
                    borderColor: "transparent",
                    padding: 20,
                    height: 100,
                },
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={({ navigation }: RootTabScreenProps<"Home">) => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Modal")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Library"
                component={Library}
                options={{
                    title: "Library",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="music" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

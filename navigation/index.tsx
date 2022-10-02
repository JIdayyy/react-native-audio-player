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
import io from "socket.io-client";
import Home from "../screens/Home";
import Library from "../screens/TabTwoScreen";
import {
  AuthStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import store, { useAppDispatch, useAppSelector } from "../src/redux/store";
import SignUpScreen from "../screens/auth/SignUp";
import SignInScreen from "../screens/auth/SignIn";
import { authMeThunk } from "../src/redux/thunk/auth";
import getAllSongs from "../src/redux/thunk/songs";
import { Spinner, useToast, View } from "native-base";
import PlaybackObjectProvider from "../src/context/playbackObjectContext";
import UploadScreen from "../screens/UploadScreen";
import { addSong } from "../src/redux/slices/player";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}): JSX.Element {
  const { isAuth } = useAppSelector((state) => state.rootReducer.user);

  React.useEffect(() => {
    if (isAuth) {
      store.dispatch(getAllSongs());
    }
  }, [isAuth]);

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
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.rootReducer.user);

  React.useEffect(() => {
    dispatch(authMeThunk());
  }, []);

  if (loading)
    return (
      <View w="full" h="full" backgroundColor="#171C26">
        <Spinner />
      </View>
    );

  return (
    <AuthStack.Navigator
      screenOptions={{ animation: "slide_from_left", presentation: "card" }}
    >
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
    </AuthStack.Navigator>
  );
}

const socket = io("http://192.168.1.18:4000");

function RootNavigator() {
  const loaders = useAppSelector((state) => state.rootReducer.player.loaders);
  const dispatch = useAppDispatch();
  const toast = useToast();

  React.useEffect(() => {
    socket.on("NEW_SONG", (data) => {
      dispatch(addSong(data));
      toast.show({
        title: "New song added",
        description: data.title,
        placement: "top",
      });
    });
    socket.on("ALBUM_UPDATE", (data) => {
      dispatch(getAllSongs());
    });

    return () => {
      socket.off("NEW_SONG");
      socket.off("ALBUM_UPDATE");
    };
  }, []);

  if (loaders.songs) return <Spinner />;

  return (
    <PlaybackObjectProvider>
      <RootStack.Navigator
        screenOptions={{ animation: "slide_from_left", presentation: "card" }}
      >
        <RootStack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <RootStack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        {/* <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="Modal" component={ModalScreen} />
        </RootStack.Group> */}
      </RootStack.Navigator>
    </PlaybackObjectProvider>
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
          borderTopWidth: 0,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Library"
        component={Library}
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          title: "Upload",
          tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />,
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

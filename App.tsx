import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  extendTheme,
  StorageManager,
  ColorMode,
} from "native-base";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import getAllSongs from "./src/redux/thunk/songs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PlaybackObjectProvider from "./src/context/playbackObjectContext";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    "linear-gradient": LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const theme = extendTheme({ colors: newColorTheme });

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        const val = await AsyncStorage.getItem("@my-app-color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("@my-app-color-mode", value as string);
      } catch (e) {
        console.log(e);
      }
    },
  };

  store.dispatch(getAllSongs());

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider
          theme={theme}
          colorModeManager={colorModeManager}
          config={config}
        >
          <SafeAreaProvider>
            <PlaybackObjectProvider>
              <Navigation colorScheme={colorScheme} />
            </PlaybackObjectProvider>
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}

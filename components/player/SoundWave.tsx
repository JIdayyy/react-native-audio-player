import { Flex, Pressable, Spinner } from "native-base";
import { GestureResponderEvent } from "react-native";
import { usePlaybackObject } from "../../src/context/playbackObjectContext";
import { useAppSelector } from "../../src/redux/store";
import SoundWaveItem from "./SoundWaveItem";

export default function SoundWave(): JSX.Element {
  const { playbackObject } = usePlaybackObject();
  const soundWave = useAppSelector(
    (state) => state.rootReducer.player.selectedSong?.soundWave?.data
  );

  const loaders = useAppSelector((state) => state.rootReducer.player.loaders);
  const duration = useAppSelector(
    (state) => state.rootReducer.songPosition.duration
  );

  const handlePress = (e: GestureResponderEvent) => {
    const newSongPosition = duration * (e.nativeEvent.locationX / 350);
    playbackObject?.setPositionAsync(newSongPosition);
  };

  if (loaders.soundWave || !soundWave) {
    return <Spinner />;
  }

  const parsedSoundWave: number[] = JSON.parse(soundWave);

  return (
    <Pressable
      onTouchMove={(event) => {
        handlePress(event);
      }}
      onPress={(event) => {
        handlePress(event);
      }}
    >
      <Flex
        position="relative"
        justifyContent="space-between"
        direction="row"
        w="90%"
        top="10%"
      >
        {soundWave &&
          parsedSoundWave.map((item, index) => (
            <SoundWaveItem key={index} index={index} item={item} />
          ))}
      </Flex>
    </Pressable>
  );
}

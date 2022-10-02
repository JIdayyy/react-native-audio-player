import { FlatList } from "native-base";
import { useAppSelector } from "../../src/redux/store";
import SongItem from "./SongItem";

export default function SongList(): JSX.Element {
  const songs = useAppSelector((state) => state.rootReducer.player.songs);
  return (
    <FlatList
      renderItem={({ item, index }) => <SongItem index={index} song={item} />}
      data={songs}
      w="90%"
      h="full"
    />
  );
}

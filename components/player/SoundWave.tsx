import { Flex, Spinner } from "native-base";
import { useAppSelector } from "../../src/redux/store";
import SoundWaveItem from "./SoundWaveItem";

export default function SoundWave(): JSX.Element {
    const { soundWave, loaders } = useAppSelector(
        (state) => state.rootReducer.player,
    );

    if (loaders.soundWave) {
        return <Spinner />;
    }

    return (
        <Flex
            position="relative"
            justifyContent="space-between"
            direction="row"
            w="90%"
            top="10%"
        >
            {soundWave.length > 1 &&
                soundWave.map((item, index) => (
                    <SoundWaveItem key={index} index={index} item={item} />
                ))}
        </Flex>
    );
}

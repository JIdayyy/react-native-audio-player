import { Flex } from "native-base";
import { useAppSelector } from "../../src/redux/store";
import SoundWaveCursor from "./SoundWaveCursor";
import SoundWaveItem from "./SoundWaveItem";

export default function SoundWave(): JSX.Element {
    const { soundWave } = useAppSelector((state) => state.rootReducer.player);

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
                    <SoundWaveItem key={index} item={item} />
                ))}

            <SoundWaveCursor />
        </Flex>
    );
}

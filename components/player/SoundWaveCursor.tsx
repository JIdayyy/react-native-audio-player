import { Box } from "native-base";
import { useAppSelector } from "../../src/redux/store";

export default function SoundWaveCursor(): JSX.Element {
    const { position, duration } = useAppSelector(
        (state) => state.rootReducer.player,
    );

    const positionPercent = (position / duration) * 100;

    return (
        <Box
            left={`${positionPercent}%`}
            position="absolute"
            top="-50px"
            height="100px"
            width="2px"
            backgroundColor="yellow.600"
        />
    );
}

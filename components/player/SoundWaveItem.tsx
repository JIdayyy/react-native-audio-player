import { Box } from "native-base";
import { useCallback } from "react";
import { useAppSelector } from "../../src/redux/store";

interface IProps {
    item: number;
    index: number;
}

export default function SoundWaveItem({ item, index }: IProps): JSX.Element {
    const { position, duration } = useAppSelector(
        (state) => state.rootReducer.player,
    );

    const positionPercent = (position / duration) * 100;
    const numberOfItems = 70;
    const itemPassed = positionPercent / (100 / numberOfItems);

    return (
        <Box
            style={{ top: (-item * 50) / 2 || 0 }}
            backgroundColor={index < itemPassed ? "white" : "gray.400"}
            width="2px"
            height={item * 50}
        />
    );
}

import { Box } from "native-base";

interface IProps {
    item: number;
}

export default function SoundWaveItem({ item }: IProps): JSX.Element {
    return (
        <Box
            style={{ top: (-item * 100) / 2 || 0 }}
            backgroundColor="white"
            width="4px"
            height={item * 100}
        />
    );
}

import { Flex, Text } from "native-base";
import { useAppSelector } from "../../src/redux/store";
import { secondsToHms } from "../../src/utils/secondToHMS";

export default function HMSTime(): JSX.Element {
    const { position, duration } = useAppSelector(
        (state) => state.rootReducer.songPosition,
    );
    return (
        <Flex direction="row" w="90%" justifyContent="space-between">
            <Text fontSize={10} color="white">
                {`0${secondsToHms(position / 1000)}` || "00:00"}
            </Text>
            <Text fontSize={10} color="gray.400">
                {`0${secondsToHms(duration / 1000)}` || "00:00"}
            </Text>
        </Flex>
    );
}

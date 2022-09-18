import { Input } from "native-base";
import React from "react";
import { Control, Controller } from "react-hook-form";

type Props = {
    control: Control;
    name: string;
    placeholder: string;
    icon: JSX.Element;
};

export default function ControlledInput({
    control,
    placeholder,
    name,
    icon,
}: Props): JSX.Element {
    return (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    InputLeftElement={icon}
                    onChangeText={(v) => onChange(v)}
                    placeholder={placeholder}
                    value={value}
                    onBlur={onBlur}
                    color="white"
                    size="lg"
                    variant="underlined"
                />
            )}
            name={name}
            rules={{ required: true }}
        />
    );
}

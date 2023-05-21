import React from "react";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {FC} from "react";
import styles from "./input.module.css";

interface Props {
    isError: boolean;
    isRequired: boolean;
    type?: "text" | "email" | "password";
    label?: string;
    value?: string;
    onChange?: (e: any) => void;
    error?: any;
    validate?: any;
}

export const MyInput: FC<Props> = (
    {
        isError,
        value,
        onChange,
        error,
        label,
        type = "text",
        validate,
        isRequired
    }) => {
    return (
        <FormControl className={styles.input} isInvalid={isError} isRequired={isRequired}>
            { label && <FormLabel>{label}</FormLabel> }
            <Input
                {...validate}
                type={type}
                defaultValue={value}
                onChange={(e) => onChange ? onChange(e.target.value) : null}
            />
            {isError && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}
import React, {FC, useId} from 'react';
import {FormControl, FormLabel, Select} from "@chakra-ui/react";
import styles from './select.module.css'

interface IOption {
    value: string | number
    text: string | number
}

interface Props {
    label?: string;
    options: IOption[];
    validate: any;
    defaultValue?: any;
}

export const MySelect: FC<Props> = ({label, options, validate, defaultValue}) => {
    return (
        <FormControl className={styles.select}>
            { label && <FormLabel>{label}</FormLabel> }
            <Select {...validate} defaultValue={defaultValue}>
                {options.map(option => <option key={useId()} value={option.value}>{option.text}</option>)}
            </Select>
        </FormControl>
    );
};

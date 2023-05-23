import React, {FC, useId} from 'react';
import {FormControl, FormLabel, Select} from "@chakra-ui/react";
import styles from './select.module.css'
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

interface Props {
    label?: string;
    options: any;
    validate: any;
    defaultValue?: any;
}

export const MySelect: FC<Props> = ({label, options, validate, defaultValue}) => {
    const {locale} = useLocalization()

    return (
        <FormControl className={styles.select}>
            { label && <FormLabel>{label}</FormLabel> }
            <Select {...validate} defaultValue={defaultValue}>
                {options.map((option: any) => <option key={useId()} value={option.value}>{option[locale].text}</option>)}
            </Select>
        </FormControl>
    );
};

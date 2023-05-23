import React from "react";
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import styles from './MyLocalization.module.css'
import ru from '@/shared/icons/ru.svg'
import en from '@/shared/icons/en.svg'
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

const MyLocalization = () => {
    const { locale, handleChangeLocale } = useLocalization()

    return (
        <span className={styles.localization}>
            <Menu>
                <MenuButton as={Button}>
                    <img src={locale === "ru" ? ru : en} alt={'locale'} width={24} height={24}/>
                </MenuButton>
                <MenuList className={styles.localizationList}>
                    <MenuItem as={Button} className={styles.localizationItem} onClick={() => handleChangeLocale()}>
                        <img src={locale === "ru" ? en : ru} alt={'locale'} width={24} height={24}/>
                    </MenuItem>
                </MenuList>
            </Menu>
        </span>
    );
};

export default MyLocalization;

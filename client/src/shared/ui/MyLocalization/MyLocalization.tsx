import React from "react";
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import styles from './MyLocalization.module.css'
import ru from '@/shared/icons/ru.svg'
import en from '@/shared/icons/en.svg'

const MyLocalization = () => {
    return (
        <span className={styles.localization}>
            <Menu>
                <MenuButton as={Button}>
                    <img src={ru} alt={'ru'} width={24} height={24}/>
                </MenuButton>
                <MenuList className={styles.localizationList}>
                    <MenuItem as={Button} className={styles.localizationItem}>
                        <img src={en} alt={'en'} width={24} height={24}/>
                    </MenuItem>
                </MenuList>
            </Menu>
        </span>
    );
};

export default MyLocalization;

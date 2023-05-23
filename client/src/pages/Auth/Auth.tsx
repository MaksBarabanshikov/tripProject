import React from "react";
import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import {Login} from "@/pages/Auth/slides/login/Login";
import styles from './auth.module.css';
import {Register} from "@/pages/Auth/slides/register/Register";
import {useTranslation} from "react-i18next";

const Auth = () => {
    const {t} = useTranslation();
    return(
        <section className={styles.authPage}>
            <Tabs>
                <TabList>
                    <Tab>{t('auth')}</Tab>
                    <Tab>{t('register')}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Register />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
    )
}

export default Auth
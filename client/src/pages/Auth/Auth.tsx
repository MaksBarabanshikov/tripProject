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

export const Auth = () => {
    return(
        <section className={styles.authPage}>
            <Tabs>
                <TabList>
                    <Tab>Авторизация</Tab>
                    <Tab>Регистрация</Tab>
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
import React from 'react';
import {Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ListTours from "@/pages/Admin/pages/Tours/slides/listTours/ListTours";
import FormAddTour from "@/pages/Admin/pages/Tours/slides/formAddTour/FormAddTour";
import {useTranslation} from "react-i18next";

const Tours = () => {
    const {t} = useTranslation();
    return (
        <>
            <Heading marginBottom={20}>{t('tours')}</Heading>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>{t('addTour')}</Tab>
                    <Tab>{t('listTour')}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <FormAddTour/>
                    </TabPanel>
                    <TabPanel>
                        <ListTours/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default Tours;

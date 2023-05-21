import React from 'react';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ListTours from "@/pages/Admin/pages/Tours/slides/listTours/ListTours";
import FormAddTour from "@/pages/Admin/pages/Tours/slides/formAddTour/FormAddTour";

const Tours = () => {
    return (
        <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>Добавить тур</Tab>
                <Tab>Список туров</Tab>
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
    );
};

export default Tours;

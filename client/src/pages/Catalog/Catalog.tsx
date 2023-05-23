import React from 'react';
import {Heading} from "@chakra-ui/react";
import {CatalogList} from "@/pages/Catalog/components/CatalogList";
import {useTranslation} from "react-i18next";

const Catalog = () => {
    const {t} = useTranslation()
    return (
        <section>
            <Heading mb={"20"}>{t('listTour')}</Heading>
            <CatalogList />
        </section>
    );
};

export default Catalog;

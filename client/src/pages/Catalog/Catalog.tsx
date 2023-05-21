import React from 'react';
import {Heading} from "@chakra-ui/react";
import {CatalogList} from "@/pages/Catalog/components/CatalogList";

const Catalog = () => {
    return (
        <section>
            <Heading>Список туров</Heading>
            <CatalogList />
        </section>
    );
};

export default Catalog;

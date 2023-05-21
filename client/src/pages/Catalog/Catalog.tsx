import React from 'react';
import {Heading} from "@chakra-ui/react";
import {CatalogList} from "@/pages/Catalog/components/CatalogList";

const Catalog = () => {
    return (
        <section>
            <Heading mb={"20"}>Список туров</Heading>
            <CatalogList />
        </section>
    );
};

export default Catalog;

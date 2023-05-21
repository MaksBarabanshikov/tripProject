import React from "react";
import {ScaleFade, Stack} from "@chakra-ui/react";
import {MyCard, MyTourCard} from "@/shared/ui/MyCard";
import {useGetTours} from "@/app/api/queries/admin/useGetTours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {handlingErrorMessage} from "@/app/helpers";

export const CatalogList = () => {

    const { isError, error, isLoading, tours } = useGetTours();

    if (isLoading) {
        return <MyLoader />
    }

    if (isError) {
        return (
            <ScaleFade initialScale={0.8} in={isError}>
                <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
            </ScaleFade>
        )
    }

    return(
        <Stack direction={'row'} flexWrap={'wrap'}>
            { tours.data.map((tour: any) => {
                return <MyTourCard
                    key={tour._id}
                    title={tour.name}
                    description={tour.desc}
                    rate={tour.rate}
                    name={tour.name}
                    price={tour.cheapestPrice}
                    address={tour.address}
                    city={tour.city}
                    places={tour.rooms}
                />
            }) }
        </Stack>
    )
}
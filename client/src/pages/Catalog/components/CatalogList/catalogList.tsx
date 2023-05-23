import React, {useState} from "react";
import {Badge, ScaleFade, Stack} from "@chakra-ui/react";
import {MyTourCard} from "@/shared/ui/MyCard";
import {useGetTours} from "@/app/api/queries/admin/useGetTours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {handlingErrorMessage} from "@/app/helpers";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";
import {typesTours} from "@/app/constants";
import {motion} from "framer-motion";

const variants = {
    hidden: {opacity: 0, scale: 1.2},
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
            stiffness: 100
        }
    }
};

export const CatalogList = () => {
    const [selectedFilter, setSelectedFilter] = useState(0);
    const {isError, error, isLoading, tours} = useGetTours();
    const {locale, normalizeDate} = useLocalization()

    if (isLoading) {
        return <MyLoader/>
    }

    if (isError) {
        return (
            <ScaleFade initialScale={0.8} in={isError}>
                <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
            </ScaleFade>
        )
    }

    function currentFilter(type: string) {
        if (selectedFilter === 0) return true
        return Number(type) === selectedFilter
    }

    return (
        <>
            {typesTours.map(item =>
                <Badge
                    px={5}
                    py={2}
                    mx={2}
                    mb={10}
                    key={item.value}
                    onClick={() => setSelectedFilter(item.value)}
                    colorScheme={item.value === selectedFilter ? 'green' : 'gray'}
                    style={{cursor: 'pointer'}}
                >
                    {item[locale].text}
                </Badge>)
            }
            <Stack direction={'row'} flexWrap={'wrap'} gap={5}>
                {tours.data.filter((tour: any) => currentFilter(tour.type)).map((tour: any) => {
                    return <motion.div key={tour._id} variants={variants} initial={"hidden"} animate={"show"} exit={"hidden"}>
                        <MyTourCard
                            id={tour._id}
                            description={tour.desc[locale]}
                            rate={tour.rate}
                            name={tour.name[locale]}
                            price={tour.price}
                            address={tour.address[locale]}
                            city={tour.city[locale]}
                            places={tour.places}
                            time={normalizeDate(tour.time)}
                            remainingPlaces={tour.remainingPlaces}
                        />
                    </motion.div>
                })}
            </Stack>
        </>
    )
}
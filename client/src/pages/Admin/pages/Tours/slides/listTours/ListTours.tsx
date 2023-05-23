import React from 'react';
import {useGetTours} from "@/app/api/queries/admin/useGetTours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {Link} from "react-router-dom";
import {MyTourCard} from "@/shared/ui/MyCard";
import MyBadge from "@/shared/ui/MyBadge/MyBage";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

const ListTours = () => {
    const {isError, tours, error, isLoading} = useGetTours()
    const { locale } = useLocalization();
    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            {tours && tours.data.map((tour: any) =>
                (<Link key={tour._id} to={`/admin/tours/${tour._id}`}>
                    <MyTourCard
                        price={tour.price}
                        address={tour.address[locale]}
                        city={tour.city[locale]}
                        places={tour.places}
                        name={tour.name[locale]}
                        description={tour.desc[locale]}
                        rate={tour.rate}
                        time={tour.time}
                        remainingPlaces={tour.remainingPlaces}
                        mb={"5"}
                    />
                </Link>))}
        </>
    );
};

export default ListTours;

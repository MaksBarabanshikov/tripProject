import React from 'react';
import {useGetTours} from "@/app/api/queries/admin/useGetTours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {Link} from "react-router-dom";
import {MyTourCard} from "@/shared/ui/MyCard";

const ListTours = () => {
    const {isError, tours, error, isLoading} = useGetTours()

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            {tours && tours.data.map((tour: any) =>
                (<Link key={tour._id} to={`/admin/tours/${tour._id}`}>
                    <MyTourCard key={tour._id}
                                price={tour.cheapestPrice}
                                address={tour.address}
                                city={tour.city}
                                places={tour.rooms}
                                name={tour.name}
                                title={tour.title}/>
                </Link>))}
        </>
    );
};

export default ListTours;

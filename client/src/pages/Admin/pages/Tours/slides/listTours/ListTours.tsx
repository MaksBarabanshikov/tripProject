import React from 'react';
import {useGetTours} from "@/app/api/queries/admin/useGetTours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {useNavigate} from "react-router-dom";

const ListTours = () => {
    const {isError, tours, error, isLoading} = useGetTours()
    const navigate = useNavigate()

    if (isLoading) {
        return <MyLoader />
    }

    return (
        <div>
            {tours && tours.data.map((tour: any) => <div aria-hidden={"true"} onClick={() => navigate(`/admin/tours/${tour._id}`)} key={tour._id}>{tour.name}</div>)}
        </div>
    );
};

export default ListTours;

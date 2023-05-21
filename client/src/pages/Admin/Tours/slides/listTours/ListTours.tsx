import React from 'react';
import {useGetTours} from "@/app/api/queries/admin/useGetTours";

const ListTours = () => {
    const {isError, tours, error, isLoading} = useGetTours()

    return (
        <div>
            {JSON.stringify(tours)}
        </div>
    );
};

export default ListTours;

import React from 'react';
import {Heading} from "@chakra-ui/react";
import {UseGetBookingsById} from "@/app/api/queries/booking/useGetBookingsById";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {MyBookingCard} from "@/shared/ui/MyCard";

const Profile = () => {
    const {bookings, isLoading} = UseGetBookingsById()

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            <Heading marginBottom={20}>Личный кабинет</Heading>
            <Heading marginBottom={10} fontSize={"2xl"}>Мои бронирования</Heading>
            {bookings && bookings.data.map((booking: any) => <MyBookingCard key={booking._id} booking={booking}/>)}
        </>
    );
};

export default Profile;

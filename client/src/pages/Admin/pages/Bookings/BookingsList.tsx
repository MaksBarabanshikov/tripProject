import React from 'react';
import {useGetBookings} from "@/app/api/queries/booking/useGetBookings";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {MyBookingCard} from "@/shared/ui/MyCard";
import {Heading} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const BookingsList = () => {
    const {t} = useTranslation();
    const {bookings, isLoading} = useGetBookings()

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            <Heading marginBottom={20}>{t('bookings')}</Heading>
            {bookings && bookings.data.map((booking: any) => <MyBookingCard mb={"5"} key={booking._id} booking={booking}/>)}
        </>
    );
};

export default BookingsList;

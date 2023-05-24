import React from 'react';
import {Heading} from "@chakra-ui/react";
import {UseGetBookingsById} from "@/app/api/queries/booking/useGetBookingsById";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {MyBookingCard} from "@/shared/ui/MyCard";
import {useTranslation} from "react-i18next";

const Profile = () => {
    const { t } = useTranslation();
    const {bookings, isLoading} = UseGetBookingsById()

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            <Heading marginBottom={20}>{t('myProfile')}</Heading>
            <Heading marginBottom={10} fontSize={"2xl"}>{t('myBookings')}</Heading>
            {bookings && bookings.data.map((booking: any) => <MyBookingCard key={booking._id} booking={booking}/>)}
        </>
    );
};

export default Profile;

import {useQuery } from "@tanstack/react-query";
import {BookingService} from "@/app/api/services/booking.service";
export const UseGetBookingsById = () => {

    const { isLoading, error, data: bookings, isError } = useQuery<any, any>({
        queryKey: ["getBookingsById"],
        queryFn: () => BookingService.getBookingsByIdUser(),
        cacheTime: 100000,
        staleTime: 60 * 100,
        keepPreviousData: true,
    });

    return { isLoading, bookings, error, isError };
};
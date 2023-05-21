import {useQuery } from "@tanstack/react-query";
import {BookingService} from "@/app/api/services/booking.service";
export const useGetBookings = () => {

    const { isLoading, error, data: bookings, isError } = useQuery<any, any>({
        queryKey: ["getBookings"],
        queryFn: () => BookingService.getBookings(),
        cacheTime: 100000,
        staleTime: 60 * 100,
        keepPreviousData: true,
    });

    return { isLoading, bookings, error, isError };
};
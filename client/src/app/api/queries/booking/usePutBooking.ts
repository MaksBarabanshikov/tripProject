import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BookingService} from "@/app/api/services/booking.service";
export const usePutBooking = () => {
    const queryClient = useQueryClient()

    const { isLoading, error, mutate: put, isError } = useMutation<any, any>({
        mutationKey: ['putBooking'],
        mutationFn: (booking: any) => BookingService.putBooking(booking),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getBookings"]})
    });

    return { isLoading, put, error, isError };
};
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BookingService} from "@/app/api/services/booking.service";
export const useCreateBooking = () => {
    const queryClient = useQueryClient()

    const { isLoading, error, mutate: create, isError } = useMutation<any, any>({
        mutationKey: ['createBooking'],
        mutationFn: (booking: any) => BookingService.createBooking(booking),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getTours"]})
    });

    return { isLoading, create, error, isError };
};
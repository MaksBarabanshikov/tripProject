import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const usePutTour = (id: string) => {
    const queryClient = useQueryClient()

    const {isLoading, error, mutate: put, isError} = useMutation<any, any, any>({
        mutationKey: ['putTour'],
        mutationFn: (data: any) => AdminService.putTour(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getTours"]})
                .then(() => queryClient.invalidateQueries({queryKey: ["getTourById", id]}))
        }
    });

    return {isLoading, put, error, isError};
};
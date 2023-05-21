import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const usePutTour = () => {
    const queryClient = useQueryClient()

    const { isLoading, error, mutate: put, isError } = useMutation<any, any>({
        mutationKey: ['putTour'],
        mutationFn: (data: any) => AdminService.putTour(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getTours"]})
    });

    return { isLoading, put, error, isError };
};
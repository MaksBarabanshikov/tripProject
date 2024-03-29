import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const useCreateTour = () => {
    const queryClient = useQueryClient()

    const { isLoading, error, mutate: create, isError } = useMutation<any, any>({
        mutationKey: ['createTour'],
        mutationFn: (tour: any) => AdminService.createTour(tour),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getTours"]})
    });

    return { isLoading, create, error, isError };
};
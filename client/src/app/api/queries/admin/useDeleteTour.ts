import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";
import {useNavigate} from "react-router-dom";

export const useDeleteTour = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const {isLoading, error, mutate: remove, isError} = useMutation<any, any, string>({
        mutationKey: ['deleteTour'],
        mutationFn: (id: string) => AdminService.deleteTour(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getTours"]}).then(() => navigate('/admin/tours'))
        }
    });

    return {isLoading, remove, error, isError};
};
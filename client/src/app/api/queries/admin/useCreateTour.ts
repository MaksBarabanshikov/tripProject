import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const useCreateTour = () => {
    // const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { isLoading, error, mutate: create, isError } = useMutation<any, any>({
        mutationKey: ['createTour'],
        mutationFn: (tour: any) => AdminService.createTour(tour),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["getTours"]})
        // onSuccess: (res: any) => {
        //     setUser(res.data)
        //     if (res.data.isAdmin) {
        //         return navigate('/admin')
        //     }
        //     return navigate('/catalog');
        // },
    });

    return { isLoading, create, error, isError };
};
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {AdminService} from "@/app/api/services/admin.service";

export const useCreateTour = () => {
    const navigate = useNavigate();

    const { isLoading, error, mutate: create, isError } = useMutation<any, any>({
        mutationKey: ['createTour'],
        mutationFn: (tour: any) => AdminService.createTour(tour),
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
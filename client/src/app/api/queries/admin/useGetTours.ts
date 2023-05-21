import {useQuery } from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const useGetTours = () => {
    // const navigate = useNavigate();

    const { isLoading, error, data: tours, isError } = useQuery<any, any>({
        queryKey: ["getTours"],
        queryFn: () => AdminService.getTours()
        // onSuccess: (res: any) => {
        //     setUser(res.data)
        //     if (res.data.isAdmin) {
        //         return navigate('/admin')
        //     }
        //     return navigate('/catalog');
        // },
    });

    return { isLoading, tours, error, isError };
};
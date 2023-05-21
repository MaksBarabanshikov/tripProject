import {useQuery } from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const useGetTours = () => {

    const { isLoading, error, data: tours, isError } = useQuery<any, any>({
        queryKey: ["getTours"],
        queryFn: () => AdminService.getTours(),
        cacheTime: 100000,
        staleTime: 60 * 100,
        keepPreviousData: true,
    });

    return { isLoading, tours, error, isError };
};
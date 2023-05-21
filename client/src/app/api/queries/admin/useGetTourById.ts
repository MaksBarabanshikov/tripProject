import {useQuery} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const useGetTourById = (id: string) => {

    const { isLoading, error, data: tour, isError } = useQuery<any, any>({
        queryKey: ["getTourById", id],
        queryFn: () => AdminService.getTourById(id),
        cacheTime: 100000,
        staleTime: 60 * 100,
        keepPreviousData: true,
    });

    return { isLoading, tour, error, isError };
};
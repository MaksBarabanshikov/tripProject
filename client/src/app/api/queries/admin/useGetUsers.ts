import {useQuery} from "@tanstack/react-query";
import {AdminService} from "@/app/api/services/admin.service";

export const useGetUsers = () => {
    const { data: users, isError, isLoading, error  } = useQuery({
        queryKey: ['usersList'],
        queryFn: () => AdminService.getUsers(),
        cacheTime: 100000,
        staleTime: 60 * 100,
        keepPreviousData: true,
    })

    return {
        isError,
        isLoading,
        error,
        users
    }
}
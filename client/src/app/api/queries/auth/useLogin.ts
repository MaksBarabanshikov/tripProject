import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/app/api/services/auth.service";
import {useUserStore} from "@/store/user";

export const useLogin = () => {
    const setUser = useUserStore((state: any) => state.setUser)

    const { isLoading, error, mutate: login, isError } = useMutation<any, any>({
        mutationKey: ['login'],
        mutationFn: (credentials: any) => AuthService.login(credentials),
        onSuccess: (res: any) => setUser(res.data),
    });

    return { isLoading, login, error, isError };
};
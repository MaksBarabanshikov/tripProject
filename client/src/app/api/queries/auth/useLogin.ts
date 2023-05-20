import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/app/api/services/auth.service";

export const useLogin = () => {
    const { isLoading, error, mutate: login, isError } = useMutation<any, any>({
        mutationKey: ['login'],
        mutationFn: (credentials: any) => AuthService.login(credentials),
    });

    return { isLoading, login, error, isError };
};
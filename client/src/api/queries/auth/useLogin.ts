import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/services/auth.service";

export const useLogin = () => {
    const { isLoading, error, data , mutate: login } = useMutation({
        mutationKey: ['login'],
        mutationFn: (credentials: any) => AuthService.login(credentials)
    });

    return { isLoading, login, error, data };
};
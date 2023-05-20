import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/app/api/services/auth.service";

export const useRegister = () => {
    const { isLoading, error, mutate: registration, isError } = useMutation<any, any>({
        mutationKey: ['register'],
        mutationFn: (credentials: any) => AuthService.register(credentials),
    });

    return { isLoading, registration, error, isError };
};
import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/app/api/services/auth.service";
import {useUserStore} from "@/store/user";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/auth";

export const useLogin = () => {
    const navigate = useNavigate();

    const setUser = useUserStore((state: any) => state.setUser);
    const setIsAuth = useAuthStore((state: any) => state.setIsAuth);

    const { isLoading, error, mutate: login, isError } = useMutation<any, any>({
        mutationKey: ['login'],
        mutationFn: (credentials: any) => AuthService.login(credentials),
        onSuccess: (res: any) => {
            setUser(res.data)
            setIsAuth()
            if (res.data.isAdmin) {
                return navigate('/admin')
            }
            return navigate('/catalog');
        },
    });

    return { isLoading, login, error, isError };
};
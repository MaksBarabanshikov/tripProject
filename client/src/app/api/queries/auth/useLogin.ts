import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/app/api/services/auth.service";
import {useUserStore} from "@/store/user";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/auth";
import {useToast} from "@chakra-ui/react";
import {handlingErrorMessage} from "@/app/helpers";

export const useLogin = () => {
    const navigate = useNavigate();
    const toast = useToast()

    const setUser = useUserStore((state: any) => state.setUser);
    const setIsAuth = useAuthStore((state: any) => state.setIsAuth);

    const { isLoading, error, mutate: login, isError } = useMutation<any, any>({
        mutationKey: ['login'],
        mutationFn: (credentials: any) => AuthService.login(credentials),
        onSuccess: (res: any) => {
            setUser(res.data)
            setIsAuth()
            toast({
                title: 'Вы успешно вошли в систему',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            if (res.data.isAdmin) {
                return navigate('/admin')
            }
            return navigate('/catalog');
        },
        onError: (err) => {
            toast({
                title: 'Ошибка :(',
                description: handlingErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    });

    return { isLoading, login, error, isError };
};
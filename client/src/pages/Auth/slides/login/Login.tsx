import {MyInput} from "@/shared/MyInput";
import {date, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Button, FormErrorMessage} from "@chakra-ui/react";
import {useLogin} from "@/api/queries/auth/useLogin";
import {useEffect} from "react";

const schema = object({
    email: string().email("Введите корректный email").required("Поле обязательно к заполнению"),
    password: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
}).required();

export const Login = () => {

    const { login, isLoading, error, data } = useLogin();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    useEffect(() => console.log(error, data), [error, data] )


    const onSubmit = (data: any) => {
        login(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isError={!!errors.email}
                validate={register("email")}
                isRequired
                type="email"
                label={'Почта'}
                error={errors?.email?.message}
            />
            <MyInput
                isError={!!errors.password}
                validate={register("password")}
                isRequired
                type="password"
                label={'Пароль'}
                error={errors?.password?.message}
            />
            <Button type={"submit"} colorScheme='facebook' isLoading={isLoading} disabled={isLoading}>Войти</Button>
        </form>
    )
}
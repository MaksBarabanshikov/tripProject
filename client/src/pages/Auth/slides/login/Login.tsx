import React from "react";
import {MyInput} from "@/shared/ui/MyInput";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Button, ScaleFade} from "@chakra-ui/react";
import {useLogin} from "@/app/api/queries/auth/useLogin";
import {handlingErrorMessage} from "@/app/helpers";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";

const schema = object({
    username: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    password: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
}).required();

export const Login = () => {

    const {
        login,
        isLoading,
        error,
        isError
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        login(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isError={!!errors.email}
                validate={register("username")}
                isRequired
                label={'Имя пользователя'}
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
            {
                isError &&
                <ScaleFade initialScale={0.8} in={isError}>
                    <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
                </ScaleFade>
            }
            <Button type={"submit"} colorScheme='facebook' isLoading={isLoading} disabled={isLoading}>Войти</Button>
        </form>
    )
}
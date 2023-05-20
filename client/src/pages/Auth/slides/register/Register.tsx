import {MyInput} from "../../../../shared/ui/MyInput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, ScaleFade} from "@chakra-ui/react";
import { object, string, ref } from "yup";
import {useRegister} from "@/app/api/queries/auth/useRegister";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {handlingErrorMessage} from "@/app/helpers";

const schema = object({
    username: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    password: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    email: string().required("Поле обязательно к заполнению").email("Некорректная почта"),
    city: string().required("Поле обязательно к заполнению"),
    country: string().required("Поле обязательно к заполнению"),
    phone: string().required("Поле обязательно к заполнению"),
    confirmPassword: string()
        .required("Поле обязательно к заполнению")
        .min(5, "Минимум 5 символов")
        .oneOf([ref('password')], 'Пароли должны совпадать')
}).required();

export const Register = () => {

    const {
        isLoading,
        registration,
        isError,
        error
    } = useRegister()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        registration(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isError={!!errors.username}
                validate={register("username")}
                isRequired
                label={'Имя пользователя'}
                error={errors?.username?.message}
            />
            <MyInput
                isError={!!errors.email}
                validate={register("email")}
                isRequired
                label={'Электронная почта'}
                error={errors?.email?.message}
            />
            <MyInput
                isError={!!errors.country}
                validate={register("country")}
                isRequired
                label={'Страна'}
                error={errors?.country?.message}
            />
            <MyInput
                isError={!!errors.city}
                validate={register("city")}
                isRequired
                label={'Город'}
                error={errors?.city?.message}
            />
            <MyInput
                isError={!!errors.phone}
                validate={register("phone")}
                isRequired
                label={'Телефон'}
                error={errors?.phone?.message}
            />
            <MyInput
                isError={!!errors.password}
                validate={register("password")}
                isRequired
                type="password"
                label={'Пароль'}
                error={errors?.password?.message}
            />
            <MyInput
                isError={!!errors.confirmPassword}
                validate={register("confirmPassword")}
                isRequired
                type="password"
                label={'Подтвердите пароль'}
                error={errors?.confirmPassword?.message}
            />
            {
                isError &&
                <ScaleFade initialScale={0.8} in={isError}>
                    <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
                </ScaleFade>
            }
            <Button
                type={"submit"}
                colorScheme='facebook'
                isLoading={isLoading}
                disabled={isLoading}
            >
                Войти
            </Button>
        </form>
    )
}
import {MyInput} from "@/shared/MyInput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@chakra-ui/react";
import { object, string, ref } from "yup";

const schema = object({
    email: string().email("Введите корректный email").required("Поле обязательно к заполнению"),
    password: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    confirmPassword: string()
        .required("Поле обязательно к заполнению")
        .min(5, "Минимум 5 символов")
        .oneOf([ref('password')], 'Пароли должны совпадать')
}).required();

export const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2))
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
            <MyInput
                isError={!!errors.confirmPassword}
                validate={register("confirmPassword")}
                isRequired
                type="password"
                label={'Подтвердите пароль'}
                error={errors?.confirmPassword?.message}
            />
            <Button type={"submit"} colorScheme='facebook'>Войти</Button>
        </form>
    )
}
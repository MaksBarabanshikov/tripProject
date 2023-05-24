import {MyInput} from "../../../../shared/ui/MyInput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, ScaleFade} from "@chakra-ui/react";
import { object, string, ref } from "yup";
import {useRegister} from "@/app/api/queries/auth/useRegister";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {handlingErrorMessage} from "@/app/helpers";
import {useLogin} from "@/app/api/queries/auth/useLogin";
import {useTranslation} from "react-i18next";

export const Register = () => {
    const {t} = useTranslation();

    const {
        isLoading,
        registration,
        isError,
        error
    } = useRegister()


    const {
        isLoading: isLoadingLogin,
        login,
        isError: isErrorLogin,
        error: errorLogin
    } = useLogin()

    const schema = object({
        username: string().required(t("errorRequired")!).min(5, t("errorMin5Symbol")!),
        password: string().required(t("errorRequired")!).min(5, t("errorMin5Symbol")!),
        email: string().required(t("errorRequired")!).email(t("errorEmail")!),
        city: string().required(t("errorRequired")!),
        country: string().required(t("errorRequired")!),
        phone: string().required(t("errorRequired")!),
        confirmPassword: string()
            .required(t("errorRequired")!)
            .min(5, t("errorMin5Symbol")!)
            .oneOf([ref('password')], t("errorConfirm")!)
    }).required();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: any) => {
        await registration(data)
        await login({username: data.username, password: data.password} as any)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isError={!!errors.username}
                validate={register("username")}
                isRequired
                label={t('username')!}
                error={errors?.username?.message}
            />
            <MyInput
                isError={!!errors.email}
                validate={register("email")}
                isRequired
                label={t('email')!}
                error={errors?.email?.message}
            />
            <MyInput
                isError={!!errors.country}
                validate={register("country")}
                isRequired
                label={t('country')!}
                error={errors?.country?.message}
            />
            <MyInput
                isError={!!errors.city}
                validate={register("city")}
                isRequired
                label={t('city')!}
                error={errors?.city?.message}
            />
            <MyInput
                isError={!!errors.phone}
                validate={register("phone")}
                isRequired
                label={t('phone')!}
                error={errors?.phone?.message}
            />
            <MyInput
                isError={!!errors.password}
                validate={register("password")}
                isRequired
                type="password"
                label={t('password')!}
                error={errors?.password?.message}
            />
            <MyInput
                isError={!!errors.confirmPassword}
                validate={register("confirmPassword")}
                isRequired
                type="password"
                label={t('passwordConfirm')!}
                error={errors?.confirmPassword?.message}
            />
            {
                (isError || isErrorLogin) &&
                <ScaleFade initialScale={0.8} in={isError}>
                    <MyErrorMessage title={handlingErrorMessage(isError ? error : isErrorLogin ? errorLogin : null)}></MyErrorMessage>
                </ScaleFade>
            }
            <Button
                type={"submit"}
                colorScheme='facebook'
                isLoading={isLoading || isLoadingLogin}
                disabled={isLoading || isLoadingLogin}
            >
                {t('signUp')}
            </Button>
        </form>
    )
}
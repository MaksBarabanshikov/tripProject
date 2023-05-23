import React, {useEffect} from "react";
import {MyInput} from "@/shared/ui/MyInput";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {Button, ScaleFade} from "@chakra-ui/react";
import {useLogin} from "@/app/api/queries/auth/useLogin";
import {handlingErrorMessage} from "@/app/helpers";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {useTranslation} from "react-i18next";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

export const Login = () => {
    const { t } = useTranslation()
    const {locale} = useLocalization();
    const {
        login,
        isLoading,
        error,
        isError
    } = useLogin();

    const schema = object({
        username: string().required(t('errorRequired')!).min(5, t('errorMin5Symbol')!),
        password: string().required(t('errorRequired')!).min(5, t('errorMin5Symbol')!),
    }).required();

    const {
        register,
        handleSubmit,
        formState: {errors},
        trigger
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        trigger()
    }, [locale]);


    const onSubmit = (data: any) => {
        login(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isError={!!errors.email}
                validate={register("username")}
                isRequired
                label={t('username')!}
                error={errors?.email?.message}
            />
            <MyInput
                isError={!!errors.password}
                validate={register("password")}
                isRequired
                type="password"
                label={t('password')!}
                error={errors?.password?.message}
            />
            {
                isError &&
                <ScaleFade initialScale={0.8} in={isError}>
                    <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
                </ScaleFade>
            }
            <Button type={"submit"} colorScheme='facebook' isLoading={isLoading} disabled={isLoading}>{t('signIn')}</Button>
        </form>
    )
}
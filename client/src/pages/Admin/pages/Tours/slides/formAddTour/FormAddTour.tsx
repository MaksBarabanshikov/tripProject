import React from 'react';
import {object, string} from "yup";
import {MyInput} from "@/shared/ui/MyInput";
import {MySelect} from "@/shared/ui/MySelect";
import {Button, ScaleFade} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreateTour} from "@/app/api/queries/admin/useCreateTour";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {handlingErrorMessage} from "@/app/helpers";
import {typesTours} from "@/app/constants";
import {useTranslation} from "react-i18next";
const FormAddTour = () => {
    const {isError, error, create, isLoading} = useCreateTour();

    const { t} = useTranslation()

    const schema = object({
        name: string().required(t('errorRequired')!).min(5, t('errorMin5Symbol')!),
        type: string().required(t('errorRequired')!),
        city: string().required(t('errorRequired')!),
        address: string().required(t('errorRequired')!).min(5, t('errorMin5Symbol')!),
        desc: string().required(t('errorRequired')!).min(5, t('errorMin5Symbol')!),
        places: string().required(t('errorRequired')!),
        price: string().required(t('errorRequired')!),
        time: string().required(t('errorRequired')!),
    }).required();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        create(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isRequired
                label={t('nameTour')!}
                isError={!!errors.name}
                validate={register("name")}
                error={errors?.name?.message}
            />
            <MySelect label={t('typeTour')!} options={typesTours} validate={register("type")}/>
            <MyInput
                isRequired
                label={t('city')!}
                isError={!!errors.city}
                validate={register("city")}
                error={errors?.city?.message}
            />
            <MyInput
                isRequired
                label={t('address')!}
                isError={!!errors.address}
                validate={register("address")}
                error={errors?.address?.message}
            />
            <MyInput
                isRequired
                label={t('description')!}
                isError={!!errors.desc}
                validate={register("desc")}
                error={errors?.desc?.message}
            />
            <MyInput
                isRequired
                label={t('numberOfSeats')!}
                isError={!!errors.places}
                validate={register("places")}
                error={errors?.places?.message}
            />
            <MyInput
                isRequired
                label={t('price')!}
                isError={!!errors.price}
                validate={register("price")}
                error={errors?.price?.message}
            />
            <MyInput
                isRequired
                label={t('time')!}
                type={'datetime-local'}
                isError={!!errors.time}
                validate={register("time")}
                error={errors?.time?.message}
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
                width={"full"}
            >
                {t('add')}
            </Button>
        </form>
    );
};

export default FormAddTour;

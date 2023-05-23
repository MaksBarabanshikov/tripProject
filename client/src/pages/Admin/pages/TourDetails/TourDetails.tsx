import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetTourById} from "@/app/api/queries/admin/useGetTourById";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {Button, Heading, ScaleFade} from "@chakra-ui/react";
import {useDeleteTour} from "@/app/api/queries/admin/useDeleteTour";
import {MyInput} from "@/shared/ui/MyInput";
import {MySelect} from "@/shared/ui/MySelect";
import {MyErrorMessage} from "@/shared/ui/MyErrorMessage/MyErrorMessage";
import {handlingErrorMessage} from "@/app/helpers";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {typesTours} from "@/app/constants";
import {usePutTour} from "@/app/api/queries/admin/usePutTour";
import {useTranslation} from "react-i18next";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

const TourDetails = () => {
    const { t } = useTranslation()
    const { locale } = useLocalization();
    const {id} = useParams()
    const {tour, isLoading, isError, error} = useGetTourById(id ? id : '')
    const {remove, isLoading: loadingDelete} = useDeleteTour()
    const {put, error: putError, isError: putIsError, isLoading: putIsLoading} = usePutTour(id ? id : '')
    const navigate = useNavigate()


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
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    function deleteTour() {
        if (id) {
            return remove(id)
        }
    }

    function onSubmit(data: any) {
        put({id, tour: {...data}})
    }

    if (isError) {
        navigate(-1)
    }

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            <Heading marginBottom={20}>Тур {tour.data.name[locale]}</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    isRequired
                    label={t('nameTour')!}
                    isError={!!errors.name}
                    validate={register("name")}
                    error={errors?.name?.message}
                    value={tour.data.name[locale]}
                />
                <MySelect label={'Тип тура'} options={typesTours} validate={register("type")}
                          defaultValue={tour.data.type[locale]}/>
                <MyInput
                    isRequired
                    label={t('city')!}
                    isError={!!errors.city}
                    validate={register("city")}
                    error={errors?.city?.message}
                    value={tour.data.city[locale]}
                />
                <MyInput
                    isRequired
                    label={t('address')!}
                    isError={!!errors.address}
                    validate={register("address")}
                    error={errors?.address?.message}
                    value={tour.data.address[locale]}
                />
                <MyInput
                    isRequired
                    label={t('description')!}
                    isError={!!errors.desc}
                    validate={register("desc")}
                    error={errors?.desc?.message}
                    value={tour.data.desc[locale]}
                />
                <MyInput
                    isRequired
                    label={t('numberOfSeats')!}
                    isError={!!errors.places}
                    validate={register("places")}
                    error={errors?.places?.message}
                    value={tour.data.places}
                />
                <MyInput
                    isRequired
                    label={t('price')!}
                    isError={!!errors.price}
                    validate={register("price")}
                    error={errors?.price?.message}
                    value={tour.data.price}
                />
                <MyInput
                    isRequired
                    label={t('time')!}
                    type={'datetime-local'}
                    isError={!!errors.time}
                    validate={register("time")}
                    error={errors?.time?.message}
                    value={tour.data.time}
                />
                {
                    putIsError &&
                    <ScaleFade initialScale={0.8} in={putIsError}>
                        <MyErrorMessage title={handlingErrorMessage(putError)}></MyErrorMessage>
                    </ScaleFade>
                }
                <Button type={"submit"} colorScheme='facebook' isLoading={putIsLoading}
                        disabled={putIsLoading} width={"full"} mb={"3"}>{t('change')}</Button>
            </form>
            <Button colorScheme={"red"} onClick={deleteTour} isLoading={loadingDelete}
                    disabled={loadingDelete} width={"full"}>{t('delete')}</Button>
        </>
    );
};

export default TourDetails;

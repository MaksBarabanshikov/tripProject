import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetTourById} from "@/app/api/queries/admin/useGetTourById";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {Button, ScaleFade} from "@chakra-ui/react";
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



const schema = object({
    name: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    type: string().required("Поле обязательно к заполнению"),
    city: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    address: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    title: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    desc: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    rooms: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    cheapestPrice: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
}).required();

const TourDetails = () => {
    const {id} = useParams()
    const {tour, isLoading, isError, error} = useGetTourById(id ? id : '')
    const {remove, isLoading: loadingDelete} = useDeleteTour()
    const {put, error: putError, isError: putIsError, isLoading: putIsLoading} = usePutTour()
    const navigate = useNavigate()
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
        console.log(data)
    }

    if (isError) {
        navigate(-1)
    }

    if (isLoading) {
        return <MyLoader/>
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    isRequired
                    label={'Название тура'}
                    isError={!!errors.name}
                    validate={register("name")}
                    error={errors?.name?.message}
                    value={tour.data.name}
                />
                <MySelect label={'Тип тура'} options={typesTours} validate={register("type")} defaultValue={tour.data.type}/>
                <MyInput
                    isRequired
                    label={'Город'}
                    isError={!!errors.city}
                    validate={register("city")}
                    error={errors?.city?.message}
                    value={tour.data.city}
                />
                <MyInput
                    isRequired
                    label={'Адрес'}
                    isError={!!errors.address}
                    validate={register("address")}
                    error={errors?.address?.message}
                    value={tour.data.address}
                />
                <MyInput
                    isRequired
                    label={'Название'}
                    isError={!!errors.title}
                    validate={register("title")}
                    error={errors?.title?.message}
                    value={tour.data.title}
                />
                <MyInput
                    isRequired
                    label={'Описание'}
                    isError={!!errors.desc}
                    validate={register("desc")}
                    error={errors?.desc?.message}
                    value={tour.data.desc}
                />
                <MyInput
                    isRequired
                    label={'Количество мест'}
                    isError={!!errors.rooms}
                    validate={register("rooms")}
                    error={errors?.rooms?.message}
                    value={tour.data.rooms}
                />
                <MyInput
                    isRequired
                    label={'Цена'}
                    isError={!!errors.cheapestPrice}
                    validate={register("cheapestPrice")}
                    error={errors?.cheapestPrice?.message}
                    value={tour.data.cheapestPrice}
                />
                {
                    isError &&
                    <ScaleFade initialScale={0.8} in={isError}>
                        <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
                    </ScaleFade>
                }
                <Button type={"submit"} colorScheme='facebook' isLoading={isLoading}
                        disabled={isLoading}>Изменить</Button>
            </form>
            <Button colorScheme={"red"} onClick={deleteTour} isLoading={loadingDelete}
                    disabled={loadingDelete}>Удалить</Button>
        </>
    );
};

export default TourDetails;

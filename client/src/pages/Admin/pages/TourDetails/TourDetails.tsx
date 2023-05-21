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


const schema = object({
    name: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    type: string().required("Поле обязательно к заполнению"),
    city: string().required("Поле обязательно к заполнению"),
    address: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    desc: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    places: string().required("Поле обязательно к заполнению"),
    price: string().required("Поле обязательно к заполнению"),
    time: string().required("Поле обязательно к заполнению"),
}).required();

const TourDetails = () => {
    const {id} = useParams()
    const {tour, isLoading, isError, error} = useGetTourById(id ? id : '')
    const {remove, isLoading: loadingDelete} = useDeleteTour()
    const {put, error: putError, isError: putIsError, isLoading: putIsLoading} = usePutTour(id ? id : '')
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
            <Heading marginBottom={20}>Тур {tour.data.name}</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    isRequired
                    label={'Название тура'}
                    isError={!!errors.name}
                    validate={register("name")}
                    error={errors?.name?.message}
                    value={tour.data.name}
                />
                <MySelect label={'Тип тура'} options={typesTours} validate={register("type")}
                          defaultValue={tour.data.type}/>
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
                    label={'Описание'}
                    isError={!!errors.desc}
                    validate={register("desc")}
                    error={errors?.desc?.message}
                    value={tour.data.desc}
                />
                <MyInput
                    isRequired
                    label={'Количество мест'}
                    isError={!!errors.places}
                    validate={register("places")}
                    error={errors?.places?.message}
                    value={tour.data.places}
                />
                <MyInput
                    isRequired
                    label={'Цена'}
                    isError={!!errors.price}
                    validate={register("price")}
                    error={errors?.price?.message}
                    value={tour.data.price}
                />
                <MyInput
                    isRequired
                    label={'Время'}
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
                        disabled={putIsLoading} width={"full"} mb={"3"}>Изменить</Button>
            </form>
            <Button colorScheme={"red"} onClick={deleteTour} isLoading={loadingDelete}
                    disabled={loadingDelete} width={"full"}>Удалить</Button>
        </>
    );
};

export default TourDetails;

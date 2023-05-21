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

const FormAddTour = () => {
    const {isError, error, create, isLoading} = useCreateTour()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: any) => {
        create(data)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                isRequired
                label={'Название тура'}
                isError={!!errors.name}
                validate={register("name")}
                error={errors?.name?.message}
            />
            <MySelect label={'Тип тура'} options={typesTours} validate={register("type")}/>
            <MyInput
                isRequired
                label={'Город'}
                isError={!!errors.city}
                validate={register("city")}
                error={errors?.city?.message}
            />
            <MyInput
                isRequired
                label={'Адрес'}
                isError={!!errors.address}
                validate={register("address")}
                error={errors?.address?.message}
            />
            <MyInput
                isRequired
                label={'Название'}
                isError={!!errors.title}
                validate={register("title")}
                error={errors?.title?.message}
            />
            <MyInput
                isRequired
                label={'Описание'}
                isError={!!errors.desc}
                validate={register("desc")}
                error={errors?.desc?.message}
            />
            <MyInput
                isRequired
                label={'Количество мест'}
                isError={!!errors.rooms}
                validate={register("rooms")}
                error={errors?.rooms?.message}
            />
            <MyInput
                isRequired
                label={'Цена'}
                isError={!!errors.cheapestPrice}
                validate={register("cheapestPrice")}
                error={errors?.cheapestPrice?.message}
            />
            {
                isError &&
                <ScaleFade initialScale={0.8} in={isError}>
                    <MyErrorMessage title={handlingErrorMessage(error)}></MyErrorMessage>
                </ScaleFade>
            }
            <Button type={"submit"} colorScheme='facebook' isLoading={isLoading} disabled={isLoading}>Добавить</Button>
        </form>
    );
};

export default FormAddTour;

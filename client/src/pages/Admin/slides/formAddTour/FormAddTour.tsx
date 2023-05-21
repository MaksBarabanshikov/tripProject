import React from 'react';
import {object, string} from "yup";
import {MyInput} from "@/shared/ui/MyInput";
import {MySelect} from "@/shared/ui/MySelect";
import {Button} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const data = [
    {value: 1, text: 'Тип 1'},
    {value: 2, text: 'Тип 2'},
    {value: 3, text: 'Тип 3'}
]

const schema = object({
    name: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    type: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    city: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    address: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    title: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    desc: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    rooms: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
    cheapestPrice: string().required("Поле обязательно к заполнению").min(5, "Минимум 5 символов"),
}).required();

const MyComponent = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });


    return (
        <form>
            <MyInput
                isRequired
                label={'Название тура'}
                isError={!!errors.name}
                validate={register("name")}
                error={errors?.name?.message}
            />
            <MySelect label={'Тип тура'} options={data}/>
            <MyInput
                isRequired
                label={'Город'}
                isError={false}
            />
            <MyInput
                isRequired
                label={'Адрес'}
                isError={false}
            />
            <MyInput
                isRequired
                label={'Название'}
                isError={false}
            />
            <MyInput
                isRequired
                label={'Описание'}
                isError={false}
            />
            <MyInput
                isRequired
                label={'Количество мест'}
                isError={false}
            />
            <Button type={"submit"} colorScheme='facebook'>Добавить</Button>
        </form>
    );
};

export default MyComponent;

import {AxiosError} from "axios";

export function handlingErrorMessage(error: any) {
    if (error?.response?.data?.message) {
        console.log(error.response?.data?.message)
        return error?.response?.data?.message
    }
    return "Неизвестная ошибка попробуйте обновить страницу";
}
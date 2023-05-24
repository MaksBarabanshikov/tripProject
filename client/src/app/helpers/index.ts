import {ILang} from "@/store/lang";
import {useTranslation} from "react-i18next";

export function handlingErrorMessage(error: any) {
    const { t } = useTranslation()
    if (error?.response?.data?.message) {
        return error?.response?.data?.message
    }
    return (t('errorUnknown'));
}

export function getCookie(name: string) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    if( getCookie( name ) ) {
        document.cookie = name + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

export function currentPrice(price: number, locale: ILang): string {
    if (locale === "ru") {
        return price + '₽'
    }
    return Math.round(price / 80) + '$'
}
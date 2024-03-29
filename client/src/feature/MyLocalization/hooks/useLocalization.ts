import {ILang, ILangStore, useLangStore} from "@/store/lang";
import {useUserStore} from "@/store/user";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

export const useLocalization = () => {
    const setLocale = useLangStore((state: ILangStore) => state.setLang);
    const locale = useLangStore((store: ILangStore) => store.lang);

    const { i18n } = useTranslation()

    useEffect(
        () => {
            i18n.changeLanguage(locale)
        },[locale])


    function handleChangeLocale() {
        return setLocale(locale === 'ru' ? 'en' : 'ru' )
    }

    function normalizeDate(date: string) {
        return new Date(date).toLocaleString(locale, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
    }

    return { handleChangeLocale, normalizeDate, locale }
}
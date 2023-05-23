import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import {useTranslation} from "react-i18next";

export type ILang = 'ru' | 'en'

export interface ILangStore {
    lang: ILang;
    setLang: (lang: ILang) => void
}

export const useLangStore = create<ILangStore>()(
    devtools(
        persist(
            (set) => ({
                lang: 'ru',
                setLang: (lang: ILang) => {

                    set({
                        lang,
                    });
                },
            }),
            {name: 'langStore', version: 1}
)));
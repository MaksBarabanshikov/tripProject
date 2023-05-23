import React from "react";
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Pages} from "@/pages";
import {Header} from "@/widgets/Header/header";
import { useTranslation } from "react-i18next";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";
import MyLocalization from "@/feature/MyLocalization/ui/MyLocalization/MyLocalization";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
        mutations: {
            retry: false
        }
    }
})

function App() {
    const { t } = useTranslation()

    const { locale, handleChangeLocale } = useLocalization()

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Pages/>
      <h1 onClick={() => handleChangeLocale()}>{t('welcome')}</h1>
      <h1 onClick={() => handleChangeLocale()}>{t('welcome')}</h1>
      <h1>{ locale }</h1>
        <MyLocalization/>
    </QueryClientProvider>
  )
}

export default App

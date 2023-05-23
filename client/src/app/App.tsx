import React from "react";
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Pages} from "@/pages";
import {Header} from "@/widgets/Header/header";
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
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Pages/>
      <MyLocalization/>
    </QueryClientProvider>
  )
}

export default App

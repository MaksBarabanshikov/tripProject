import React from "react";
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Pages} from "@/pages";
import {AxiosResponse} from "axios";

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
      <Pages/>
    </QueryClientProvider>
  )
}

export default App

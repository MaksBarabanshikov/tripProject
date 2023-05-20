import './App.css'
import {Auth} from "./pages/Auth";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
      <Auth/>
    </QueryClientProvider>
  )
}

export default App

import axios from 'axios';
import {deleteCookie} from "@/app/helpers";
import {useUserStore} from "@/store/user";
import {useAuthStore} from "@/store/auth";


const baseURL = import.meta.env.VITE_URL_API || 'http://localhost:8800/api/';
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.response.use(undefined, (err) => {
    if (err.response.status === 401 || err.response.status === 419) {
        const setUser = useUserStore(store => store.setUser);
        const setIsAuth = useAuthStore((state: any) => state.setIsAuth);
        deleteCookie('access_token');
        setIsAuth()
        return setUser(null);
    }
});

export default instance;

import axios from 'axios';

const baseURL = import.meta.env.VITE_URL_API || 'http://localhost:8800/api/';
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use(function (config) {
    // const authStore = useAuthStore();

    // const token = authStore.userToken.token;
    const token = null;

    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
});

// instance.interceptors.response.use(undefined, (err) => {
//     const errorMessage = err.request.response;
//
//     if (err.response.status === 401 || err.response.status === 419) {
//         const token = authStore.userToken;
//
//         if (token) {
//             authStore.logout();
//             return router.push({ name: 'home' });
//         }
//     }
//
//     return Promise.reject(JSON.parse(errorMessage));
// });

export default instance;

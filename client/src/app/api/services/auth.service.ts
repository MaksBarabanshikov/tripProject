import instance from "@/app/api/instance";

export const AuthService = {
    login: async function(credentials: any) {
            return await instance.post('auth/login', credentials);
    },
    register: async function(credentials: any) {
        return await instance.post('auth/register', credentials);
    }
}
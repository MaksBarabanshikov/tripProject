import instance from "@/api/instance";

export const AuthService = {
    login: async function(credentials: any) {
        try {
            await instance.post('auth/login', credentials);
        }
        catch (err) {

        }
    },
    register: async function(credentials: any) {
        return instance.post('auth/register', credentials);
    }
}
import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import {getCookie} from "@/app/helpers";

export interface IUserDetails {
    _id: string
    username: string
    email: string
    country: string
    city: string
    phone: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface IUser {
    details: IUserDetails
    isAdmin: boolean
}

export interface IAuthState {
    isAuth: boolean;
}

export const useAuthStore = create<IAuthState>()(
    devtools(
        persist(
            () => ({
                isAuth: !!getCookie('access_token'),
            }),
            {name: 'AuthStore', version: 1}
        )));
import create from "zustand";
import {devtools, persist} from "zustand/middleware";

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

export interface IUserState {
    user: IUser | null;
    setUser: (user: IUser | null) => void
}

export const useUserStore = create<IUserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (user: IUser | null) => set({
                    user,
                }),
            }),
            {name: 'userStore', version: 1}
        )));
import {Button, Heading, Stack} from "@chakra-ui/react";
import React from "react";
import {useUserStore} from "@/store/user";
import {useAuthStore} from "@/store/auth";
import {Link, Navigate, useLocation} from "react-router-dom";
import {deleteCookie} from "@/app/helpers";

export const Header = () => {
    const location = useLocation()
    const user = useUserStore(store => store.user);
    const setUser = useUserStore(store => store.setUser);
    const isAuth = useAuthStore(store => store.isAuth);
    const setIsAuth = useAuthStore((state: any) => state.setIsAuth);

    console.log(location)

    if (location.pathname === '/admin') return


    if (!isAuth) {
        return <Navigate to={'/'} />
    }

    function handleLogout() {
        deleteCookie('access_token');
        setIsAuth()
        return setUser(null);
    }

    return(
        <header style={{ marginBottom: 20 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Heading>Trip</Heading>
                <div>
                    { user?.details?.username }
                    { user?.isAdmin &&
                        <Link to={'/admin'}>
                            <Button marginLeft={2}>
                                Админ панель
                            </Button>
                        </Link>
                    }
                    <Button marginLeft={2} onClick={() => handleLogout()}>
                        Выйти
                    </Button>
                </div>
            </Stack>
        </header>
    )
}
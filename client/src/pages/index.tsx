import React, {Suspense, useEffect} from 'react'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "@/shared/routes/ProtectedRoute";
import {useAuthStore} from "@/store/auth";
import {Heading} from "@chakra-ui/react";
import {UsersList} from "@/pages/Admin/pages/users/UsersList";
import Tours from "@/pages/Admin/pages/Tours/Tours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";

const Auth = React.lazy(() => import('./Auth/Auth'))
const Admin = React.lazy(() => import('./Admin/Admin'))
const Catalog = React.lazy(() => import('./Catalog/Catalog'))

export const Pages = () => {
    const isAuth = useAuthStore( state => state.isAuth );

    useEffect(() => {
        console.log(isAuth)
    },[isAuth])

    return (
        <Routes>
            <Route path={'/'} element={
                <Suspense fallback={<MyLoader/>}>
                    <Auth/>
                </Suspense>
            }/>
            <Route element={<ProtectedRoute isAuth={isAuth} />}>
                <Route path={'/admin'} element={
                    <Suspense fallback={<MyLoader/>}>
                        <Admin/>
                    </Suspense>
                }>
                    <Route index element={<Heading as="h1" size='xl'>Админ панель TRIP ADMIN</Heading>} />
                    <Route path={'tours'} element={<Tours />} />
                    <Route path={'users'} element={ <UsersList /> }/>
                    <Route path={'bookings'} element={<div>bookings</div>} />
                </Route>
                <Route path={'/catalog'} element={
                    <Suspense fallback={<MyLoader/>}>
                        <Catalog/>
                    </Suspense>
                }/>
            </Route>
        </Routes>
    )
}
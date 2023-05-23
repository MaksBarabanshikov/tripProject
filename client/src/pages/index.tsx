import React, {Suspense} from 'react'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "@/shared/routes/ProtectedRoute";
import {useAuthStore} from "@/store/auth";
import {Heading} from "@chakra-ui/react";
import {UsersList} from "@/pages/Admin/pages/users/UsersList";
import Tours from "@/pages/Admin/pages/Tours/Tours";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import TourDetails from "@/pages/Admin/pages/TourDetails/TourDetails";
import BookingsList from "@/pages/Admin/pages/Bookings/BookingsList";
import {useTranslation} from "react-i18next";

const Auth = React.lazy(() => import('./Auth/Auth'))
const Admin = React.lazy(() => import('./Admin/Admin'))
const Catalog = React.lazy(() => import('./Catalog/Catalog'))
const Profile = React.lazy(() => import('./Profile/Profile'))

export const Pages = () => {
    const isAuth = useAuthStore( state => state.isAuth );
    const {t} = useTranslation();
    return (
        <Routes>
            <Route path={'/'} element={<ProtectedRoute isAuth={!isAuth} redirectPath={'/catalog'} />}>
                <Route index element={
                    <Suspense fallback={<MyLoader/>}>
                        <Auth/>
                    </Suspense>
                }/>
            </Route>
            <Route element={<ProtectedRoute isAuth={isAuth} />}>
                <Route path={'/admin'} element={
                    <Suspense fallback={<MyLoader/>}>
                        <Admin/>
                    </Suspense>
                }>
                    <Route index element={<Heading as="h1" size='xl'>{t('adminPanel')} TRIP ADMIN</Heading>} />
                    <Route path={'tours'} element={<Tours />} />
                    <Route path={'tours/:id'} element={<TourDetails/>}/>
                    <Route path={'users'} element={ <UsersList /> }/>
                    <Route path={'bookings'} element={<BookingsList/>} />
                </Route>
                <Route path={'/catalog'} element={
                    <Suspense fallback={<MyLoader/>}>
                        <Catalog/>
                    </Suspense>
                }/>
                <Route path={'/profile'} element={
                    <Suspense fallback={<MyLoader/>}>
                        <Profile/>
                    </Suspense>
                }/>
            </Route>
        </Routes>
    )
}
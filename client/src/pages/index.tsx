import React from 'react'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "@/shared/routes/ProtectedRoute";
import {useAuthStore} from "@/store/auth";
import FormAddTour from "@/pages/Admin/slides/formAddTour/FormAddTour";

const Auth = React.lazy(() => import('./Auth/Auth'))
const Admin = React.lazy(() => import('./Admin/Admin'))
const Catalog = React.lazy(() => import('./Catalog/Catalog'))

export const Pages = () => {
    const isAuth = useAuthStore( state => state.isAuth );
    return (
        <Routes>
            <Route path={'/'} element={<Auth/>}/>
            <Route element={<ProtectedRoute isAuth={isAuth} />}>
                <Route path={'/admin'} element={<Admin/>}>
                    <Route path={'tours'} element={<FormAddTour />} />
                    <Route path={'users'} element={<div>users</div>} />
                    <Route path={'bookings'} element={<div>bookings</div>} />
                </Route>
                <Route path={'/catalog'} element={<Catalog/>}/>
            </Route>
        </Routes>
    )
}
import React from 'react'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "@/shared/routes/ProtectedRoute";
import {useAuthStore} from "@/store/auth";

const Auth = React.lazy(() => import('./Auth/Auth'))
const Catalog = React.lazy(() => import('./Catalog/Catalog'))

export const Pages = () => {
    const isAuth = useAuthStore( state => state.isAuth );
    return (
        <Routes>
            <Route path={'/'} element={<Auth/>}/>
            <Route element={<ProtectedRoute isAuth={isAuth} />}>
                <Route path={'/catalog'} element={<Catalog/>}/>
            </Route>
        </Routes>
    )
}
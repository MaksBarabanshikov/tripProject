import React from 'react'
import {Route, Routes} from "react-router-dom";

const Auth = React.lazy(() => import('./Auth/Auth'))
const Admin = React.lazy(() => import('./Admin/Admin'))
const Catalog = React.lazy(() => import('./Catalog/Catalog'))

export const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Auth/>}/>
            <Route path={'/admin'} element={<Admin/>}/>
            <Route path={'/catalog'} element={<Catalog/>}/>
        </Routes>
    )
}
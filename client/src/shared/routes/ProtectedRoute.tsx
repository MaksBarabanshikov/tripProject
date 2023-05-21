import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
    isAuth: boolean;
    redirectPath?: string;
}

export const ProtectedRoute = ({isAuth, redirectPath = '/'}: IProps) => {
    return isAuth ? <Outlet /> : <Navigate to={redirectPath} />;
};
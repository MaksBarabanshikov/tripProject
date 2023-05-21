import React from 'react';
import {MyInput} from "@/shared/ui/MyInput";
import {SideBar} from "@/widgets/SideBar/SideBar";
import {Stack} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";


const Admin = () => {
    return (
        <Stack direction="row">
            <SideBar />
            <Outlet />
        </Stack>
    );
};

export default Admin;

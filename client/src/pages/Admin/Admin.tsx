import React from 'react';
import {MyInput} from "@/shared/ui/MyInput";
import {SideBar} from "@/widgets/SideBar/SideBar";
import {Stack} from "@chakra-ui/react";

const Admin = () => {
    return (
        <Stack direction="row">
            <SideBar />
            <form>
                <MyInput
                    isRequired
                    label={'Название тура'}
                    isError={false}
                />
                <MyInput
                    isRequired
                    label={'Тип'}
                    isError={false}
                />
                <MyInput
                    isRequired
                    label={'Город'}
                    isError={false}
                />
            </form>
        </Stack>
    );
};

export default Admin;

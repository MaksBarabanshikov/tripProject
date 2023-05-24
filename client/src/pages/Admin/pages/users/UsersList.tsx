import React from "react";
import {Heading, Stack} from "@chakra-ui/react";
import {useGetUsers} from "@/app/api/queries/admin/useGetUsers";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {MyCard} from "@/shared/ui/MyCard";
import {useTranslation} from "react-i18next";

export const UsersList = () => {
    const { t } = useTranslation();
    const {
        users,
        isError,
        error,
        isLoading
    } = useGetUsers();

    if (isLoading) {
        return <MyLoader />
    }

    return (
        <>
            <Heading marginBottom={20}>{ t('listUsers') }</Heading>
            <Stack spacing={10} direction={'row'} alignContent={'center'} flexWrap='wrap' gap={10}>
                { users &&
                    users.data.map((user: any) => <MyCard key={user._id} name={user.username} description={user.email} isAdmin={user.isAdmin}/>)
                }
            </Stack>
        </>
    )
}
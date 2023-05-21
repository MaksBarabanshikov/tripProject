import {Card, Stack} from "@chakra-ui/react";
import {useGetUsers} from "@/app/api/queries/admin/useGetUsers";
import {MyLoader} from "@/shared/ui/MyLoader/MyLoader";
import {IUser} from "@/store/user";

export const UsersList = () => {
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
        <Stack spacing={10} direction={'row'} flexWrap='wrap'>
            { users &&
                users.data.map((user: IUser) => <Card>
                    { user.details.username }
                </Card>)
            }
        </Stack>
    )
}
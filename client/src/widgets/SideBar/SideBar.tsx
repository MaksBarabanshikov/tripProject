import styles from "./sidebar.module.css";
import {FC} from "react";
import {MyListItem} from "@/shared/ui/MyListItem";
import {Button, Heading, Stack} from "@chakra-ui/react";
import {Link} from "react-router-dom";

interface Props {

}

const items = [
    {
        title: 'Туры',
        to: '/tours',
    },
    {
        title: 'Пользователи',
        to: '/users',
    },
    {
        title: 'Бронирования',
        to: '/bookings'
    }
]

export const SideBar: FC<Props> = () => {
    return(
        <aside className={styles.sidebar}>
            <Heading as='h4' size='lg'>Trip Admin</Heading>
            <Stack direction="column">
                {
                    items.map(item => <MyListItem key={item.title} to={item.to} title={item.title} />)
                }
            </Stack>
            <Link to={'/catalog'}>
                <Button>
                    Перейти в каталог
                </Button>
            </Link>
        </aside>
    )
}
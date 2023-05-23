import styles from "./sidebar.module.css";
import {FC} from "react";
import {MyListItem} from "@/shared/ui/MyListItem";
import {Button, Heading, Stack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const SideBar: FC = () => {
    const { t } = useTranslation()

    const items = [
        {
            title: t('tours'),
            to: '/admin/tours',
        },
        {
            title: t('users'),
            to: '/admin/users',
        },
        {
            title: t('bookings'),
            to: '/admin/bookings'
        }
    ]

    return(
        <aside className={styles.sidebar}>
            <Link to={'/admin'}>
                <Heading as='h4' size='lg'>Trip Admin</Heading>
            </Link>
            <Stack direction="column">
                {
                    items.map(item => <MyListItem key={item.title} to={item.to} title={item.title} />)
                }
            </Stack>
            <Link to={'/catalog'}>
                <Button marginTop={10}>
                    { t('goToCatalog') }
                </Button>
            </Link>
        </aside>
    )
}
import React, {FC} from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Menu,
    MenuButton, MenuItem, MenuList,
    Stack,
    Text, Tooltip
} from "@chakra-ui/react";
import styles from "./MyCard.module.css";
import {ModalBooking} from "@/shared/ui/ModalBooking/ModalBooking";
import MyBadge from "@/shared/ui/MyBadge/MyBage";
import {useLocation} from "react-router-dom";
import {statusesBookings} from "@/app/constants";
import {usePutBooking} from "@/app/api/queries/booking/usePutBooking";
import {useTranslation} from "react-i18next";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

interface Props {
    name: string;
    description?: string;
    rate?: number;
    mb?: string;
}

export const MyCard: FC<Props> = ({name, description, rate}) => {
    return (
        <Card marginLeft={0} className={styles.MyCard}>
            <CardHeader>
                <Heading as='h4' size="md">{name}</Heading>
            </CardHeader>
            <CardBody>
                {description &&
                    <Text>
                        {description}
                    </Text>
                }
            </CardBody>
            <CardFooter>
                {rate && <Heading as="h6" size="xs">Рейтинг: {rate}</Heading>}
            </CardFooter>
        </Card>
    )
}

interface PropsTour extends Props {
    id?: string,
    price: number,
    address: string,
    city: string,
    places: number,
    name: string,
    description: string,
    rate: number,
    time: string,
    remainingPlaces: number
}

export const MyTourCard: FC<PropsTour> = (
    {
        id,
        description,
        rate,
        places,
        address,
        city,
        name,
        price,
        time,
        remainingPlaces,
        mb
    }) => {
    const {pathname} = useLocation()
    const { t } = useTranslation()

    return (
        <Card marginLeft={0} className={styles.MyCard} mb={mb}>
            <CardHeader>
                <Heading as='h4' size="md">{name}</Heading>
            </CardHeader>
            <CardBody>
                {description &&
                    <Text>
                        {description}
                    </Text>
                }
                <Text>
                    { t('numberOfSeats') + ':' + places }
                </Text>
                <Text>
                    { t('placesLeft') + ':' + remainingPlaces }
                </Text>
                <Text>
                    { t('address') + ':' + address }
                </Text>
                <Text>
                    { t('city') + ':' + city }
                </Text>
                <Text>
                    { t('time') + ':' + time }
                </Text>
            </CardBody>
            <CardFooter>
                <Stack style={{width: '100%'}} direction={'column'}>
                    {rate && <Heading as="h6" size="xs">
                        { t('rate') + ':' + rate }
                    </Heading>}
                    <Text>
                        { t('price') + ':' + price + 'Р'}
                    </Text>
                    {!pathname.includes('admin') &&
                        <ModalBooking tour={{
                            id,
                            description,
                            rate,
                            places,
                            address,
                            remainingPlaces,
                            city,
                            name,
                            price,
                            time,
                        }}
                        />
                    }
                </Stack>
            </CardFooter>
        </Card>
    )
}

interface IBookingProps {
    booking: any
    mb?: string
}

export const MyBookingCard: FC<IBookingProps> = ({booking, mb}) => {
    const {t} = useTranslation();
    const { locale } = useLocalization()
    const {put} = usePutBooking()
    const {pathname} = useLocation()

    function onClick(data: any) {
        put(data)
    }

    return (
        <Card marginLeft={0} className={styles.MyCard} mb={mb}>
            <Text>
                { t('tour') + ':' + booking?.tour?.name[locale]  }
            </Text>
            <Text>
                { t('customer') + ':' + booking?.user?.username  }
            </Text>
            <Text>
                { t('numberOfPersons') + ':' + booking?.countPeople  }
            </Text>
            <Tooltip label={t('priceFor1Person')} fontSize='md'>
                <Text>
                    { t('price') + ':' + booking?.price + 'P'  }
                </Text>
            </Tooltip>
            <MyBadge status={booking.status}/>
            {pathname.includes('admin') &&
                <Menu>
                    <MenuButton
                        as={Button}
                    >
                        { t('changeStatus') }
                    </MenuButton>
                    <MenuList>
                        {statusesBookings.map(item => {
                            if (item.value != booking.status) {
                                return (
                                    <MenuItem key={item.value}
                                              onClick={() => onClick({...booking, status: item.value})}>
                                        {item.text}
                                    </MenuItem>
                                )
                            }
                        })}
                    </MenuList>
                </Menu>
            }
        </Card>
    )
}

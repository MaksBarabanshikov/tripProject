import React, {FC, PropsWithChildren} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text} from "@chakra-ui/react";
import styles from "./MyCard.module.css";
import {ModalBooking} from "@/shared/ui/ModalBooking/ModalBooking";

interface Props {
    title: string;
    description?: string;
    rate?: number;
}

export const MyCard: FC<Props> = ({title, description, rate}) => {
    return (
        <Card marginLeft={0} className={styles.MyCard}>
            <CardHeader>
                <Heading as='h4' size="md">{title}</Heading>
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
    price: number,
    address: string,
    city: string,
    places: string[],
    name: string
}

export const MyTourCard:FC<PropsTour>= (
    {
        title,
        description,
        rate,
        places,
        address,
        city,
        name,
        price
    }) => {
    return(
        <Card marginLeft={0} className={styles.MyCard}>
            <CardHeader>
                <Heading as='h4' size="md">{title}</Heading>
                <Heading as='h6' size="sm">{name}</Heading>
            </CardHeader>
            <CardBody>
                {description &&
                    <Text>
                        {description}
                    </Text>
                }
                <Text>
                    кол-во мест: { places.length }
                </Text>
                <Text>
                    адрес: { address }
                </Text>
                <Text>
                    город : { city }
                </Text>
            </CardBody>
            <CardFooter>
                <Stack direction={'column'}>
                    {rate && <Heading as="h6" size="xs">Рейтинг: {rate}</Heading>}
                    <Text>
                        цена: { price + 'Р' }
                    </Text>
                    <ModalBooking tour={{
                        title,
                        description,
                        rate,
                        places,
                        address,
                        city,
                        name,
                        price
                    }} />
                </Stack>
            </CardFooter>
        </Card>
    )
}
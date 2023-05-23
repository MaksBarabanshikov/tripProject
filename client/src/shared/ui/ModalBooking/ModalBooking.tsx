import React, {FC} from "react";
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Text,
    useDisclosure
} from "@chakra-ui/react";
import {MyInput} from "@/shared/ui/MyInput";
import {useCreateBooking} from "@/app/api/queries/booking/useCreateBooking";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";

export interface ITour {
    id?: string,
    description: string,
    rate: number,
    places: number,
    address: string,
    city: string,
    name: string,
    price: number,
    time: string,
    remainingPlaces: number
}

interface Props {
    tour: ITour;
}

const schema = object({
    countPeople: string().required("Поле обязательно к заполнению")
}).required();

export const ModalBooking: FC<Props> = ({tour}) => {
    const {isOpen, onOpen, onClose}: any = useDisclosure()
    const {create} = useCreateBooking()

    const { t } = useTranslation()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        create({tour: tour.id, price: data.countPeople * tour.price, ...data})
    }

    return (
        <>
            <Stack style={{ width: '100%' }} justifyContent={'center'}>
                <Button onClick={onOpen} width={"full"} disabled={!!tour.places}>{ t('toBook') }</Button>
            </Stack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{ t('toBook') + tour.name}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            {tour.description}
                        </Text>
                        <Text>
                            { t('address') + ':' + tour.address }
                        </Text>
                        <Text>
                            { t('city') + ':' + tour.city }
                        </Text>
                        <Text>
                            { t('price') + ':' + tour.price + 'Р'}
                        </Text>
                        <Text>
                            { t('numberOfSeats') + ':' + tour.places }
                        </Text>
                        <Text>
                            { t('placesLeft') + ':' + tour.remainingPlaces }
                        </Text>
                        <Text>
                            { t('time') + ':' + tour.time }
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                            <MyInput isRequired
                                     label={'Количество человек'}
                                     isError={!!errors.countPeople}
                                     validate={register("countPeople")}
                                     error={errors?.countPeople?.message}
                                     type={"number"}
                                     max={Number(tour.remainingPlaces)}
                            />
                            <Button variant='solid' type={"submit"}>{ t('toBook') }</Button>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
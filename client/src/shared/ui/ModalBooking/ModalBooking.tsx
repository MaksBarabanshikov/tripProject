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

export interface ITour {
    id?: string,
    description: string,
    rate: number,
    places: number,
    address: string,
    city: string,
    name: string,
    price: number,
    time: string
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
                <Button onClick={onOpen} width={"full"} disabled={!!tour.places}>Забронировать</Button>
            </Stack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Забронировать {tour.name}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            {tour.description}
                        </Text>
                        <Text>
                            адрес: {tour.address}
                        </Text>
                        <Text>
                            город: {tour.city}
                        </Text>
                        <Text>

                        </Text>
                        <Text>
                            цена: {tour.price + ' Р'}
                        </Text>
                        <Text>
                            Всего мест: {tour.places}
                        </Text>
                        <Text>
                            Осталось мест: {tour.places - 1}
                        </Text>
                        <Text>
                            Время : {tour.time}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                            <MyInput isRequired
                                     label={'Количество человек'}
                                     isError={!!errors.countPeople}
                                     validate={register("countPeople")}
                                     error={errors?.countPeople?.message}/>
                            <Button variant='solid' type={"submit"}>Забронировать</Button>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
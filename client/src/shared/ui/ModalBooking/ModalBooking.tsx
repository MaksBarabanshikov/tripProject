import React, {FC} from "react";
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";

export interface ITour {
    title: string,
    description: string,
    rate: number,
    places: string[],
    address: string,
    city: string,
    name: string,
    price: number,
}

interface Props {
    tour: ITour;
}

export const ModalBooking:FC<Props> = ({ tour }) => {
    const { isOpen, onOpen, onClose }: any = useDisclosure()
  return(
      <>
          <Button onClick={onOpen}>Забронировать</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>Забронировать {tour.title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <Text>
                          { tour.description }
                      </Text>
                      <Text>
                          адрес: {tour.address}
                      </Text>
                      <Text>
                          город: { tour.city }
                      </Text>
                      <Text>

                      </Text>
                      <Text>
                        цена: { tour.price + ' Р' }
                      </Text>
                      <Text>
                          Всего мест: {tour.places.length}
                      </Text>
                      <Text>
                          Осталось мест: {tour.places.length - 1}
                      </Text>

                  </ModalBody>

                  <ModalFooter>
                      <Button variant='solid'>Забронировать</Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
    </>
  )
}
import React, {FC} from 'react';
import {Badge} from "@chakra-ui/react";

interface IProps {
    status?: number
}

const MyBadge: FC<IProps> = ({status}) => {

    function switchStatus() {
            switch (status) {
                case 1:
                    return {colorScheme: 'gray', title: 'На усмотрении'}

                case 2:
                    return {colorScheme: 'green', title: 'Принято'}

                case 3:
                    return {colorScheme: 'red', title: 'Отклонено'}

                default:
                    return {colorScheme: 'default', title: ''}
            }
    }
    const currentStatus = switchStatus()

    return (
        <Badge colorScheme={currentStatus.colorScheme}>{currentStatus.title}</Badge>
    );
};

export default MyBadge;

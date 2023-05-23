import React, {FC} from 'react';
import {Badge} from "@chakra-ui/react";
import {useLocalization} from "@/feature/MyLocalization/hooks/useLocalization";

interface IProps {
    status?: number
}

const MyBadge: FC<IProps> = ({status}) => {
    const {locale} = useLocalization()

    function switchStatus() {
        switch (status) {
            case 1:
                return {
                    colorScheme: 'gray',
                    ru: {
                        text: 'На усмотрении'
                    },
                    en: {
                        text: 'At discretion'
                    }
                }

            case 2:
                return {
                    colorScheme: 'green',
                    ru: {
                        text: 'Принят'
                    },
                    en: {
                        text: 'Accepted'
                    }
                }

            case 3:
                return {
                    colorScheme: 'red',
                    ru: {
                        text: 'Отклонён'
                    },
                    en: {
                        text: 'Rejected'
                    }
                }

            default:
                return {
                    colorScheme: 'default',
                    ru: {
                        text: ''
                    },
                    en: {
                        text: ''
                    }
                }
        }
    }

    const currentStatus = switchStatus()

    return (
        <Badge colorScheme={currentStatus.colorScheme}>{currentStatus[locale].text}</Badge>
    );
};

export default MyBadge;

import React, {FC} from "react";
import {AlertDescription, AlertIcon, AlertTitle, Alert, ScaleFade} from "@chakra-ui/react";

interface Props {
    title: string;
    description?: string;
}

export const MyErrorMessage:FC<Props> = ({ title, description }) => {
    return (
            <Alert status='error' rounded={10} marginBottom={5}>
                <AlertIcon />
                <AlertTitle>{ title }</AlertTitle>
                {description && <AlertDescription>{ description }</AlertDescription>}
            </Alert>
    )
}
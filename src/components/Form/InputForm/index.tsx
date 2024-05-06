import React from "react";
import { TextInputProps } from 'react-native';

import { Container, Label, Input } from "./styles";

interface IProps extends TextInputProps {
    field: string;
}

export function InputForm ({field, ...rest} : IProps) {
    return(
     <Container>
        <Label>{field}</Label>
        <Input {...rest}></Input>
     </Container>
    )
}
import React from "react";

import {
    Container,
    ContentInformation,
    ContentIcon,
} from "./styles";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../global/styles/theme";

export interface IProps {
    info: string;
}

export function SeparatorTag({info}: IProps) {
    return (
        <Container>
            <ContentInformation>{info}</ContentInformation>
            <ContentIcon>
                <Icon
                    name="arrow-right"
                    size={34}
                    color={`${theme.colors.gray}`}
                    style={{
                        position: "absolute",
                        right: 2,
                        bottom: 0,
                    }}
                />
            </ContentIcon>
        </Container>
    )
}

import React from "react";
import {
    Container,
    ContentTitle,
    TitleText,
    ContentIcon,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../global/styles/theme";

interface IProps {
    title: any;
    name: any;
}

export function InfoTitle({ title, name }: IProps) {
    return (
        <Container>
            <ContentTitle>
                <TitleText>{title}</TitleText>
            </ContentTitle>
            <ContentIcon>
                <Icon
                    name={name}
                    size={36}
                    color={theme.colors.gray_dark}
                    style={{
                        position: 'absolute',
                        left: 10,
                        top: 0,
                    }}
                />
            </ContentIcon>
        </Container>
    )
}
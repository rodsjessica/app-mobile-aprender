import React from "react";
import {
    Container,
    ContentTitle,
    Title,
    ContentIcon,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../global/styles/theme";

export interface IProps {
    title: string;
    iconName: string;
    childToParent: any;
}

export function HeaderNavigation({ title, iconName, childToParent }: IProps) {
    const click = true;

    return (
        <Container>
            <ContentIcon onPress={() => childToParent(click)}>
                <Icon
                    name={iconName}
                    size={34}
                    color={`${theme.colors.background}`}
                    style={{
                        position: 'absolute',
                        left: 10,
                        top: 6,
                    }} />
            </ContentIcon>
            <ContentTitle>
                <Title>{title}</Title>
            </ContentTitle>
        </Container>
    )
}
import React from "react";

import {
    Container,
    ContentTitle,
    Title,
    ContentDesc,
    Description,
    ContentType,
    Content,
    Info,
    ContentIcon,
    ContentCategory,
    Category,
    ContentTime,
    Time,
    ContentTeacher,
    Teacher
} from "./styles";

import theme from "../../global/styles/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface IProps {
    title: string;
    description: string;
    category: string;
    time: string;
    teacher: string;
}

export function CardInfoCourse({ title, description, category, time, teacher }: IProps) {
    return (
        <Container>
            <ContentTitle>
                <Title numberOfLines={2}>{title}</Title>
            </ContentTitle>
            <ContentDesc>
                <Description numberOfLines={4}>{description}</Description>
            </ContentDesc>
            <ContentType>
                <Content>
                    <ContentIcon>
                        <Icon
                            name="clipboard-text-outline"
                            size={30}
                            color={`${theme.colors.third}`}
                            style={{
                                position: 'absolute',
                                right: 6,
                                alignSelf: 'center',
                            }} />
                    </ContentIcon>
                    <ContentCategory>
                        <Category>Categoria: <Info>{`${category}`}</Info></Category>
                    </ContentCategory>
                </Content>
                <Content>
                    <ContentIcon>
                        <Icon
                            name="clock-outline"
                            size={30}
                            color={`${theme.colors.fourth}`}
                            style={{
                                position: 'absolute',
                                right: 6,
                                alignSelf: 'center'
                            }} />
                    </ContentIcon>
                    <ContentTime>
                        <Time>Duração: <Info>{`${time}`} horas</Info></Time>
                    </ContentTime>
                </Content>
                <Content>
                    <ContentIcon>
                        <Icon
                            name="account-outline"
                            size={30}
                            color={`${theme.colors.secondary}`}
                            style={{
                                position: 'absolute',
                                right: 6,
                                alignSelf: 'center'
                            }} />
                    </ContentIcon>
                    <ContentTeacher>
                        <Teacher>Professor: <Info>{`${teacher}`}</Info></Teacher>
                    </ContentTeacher>
                </Content>
            </ContentType>
        </Container>
    )
}
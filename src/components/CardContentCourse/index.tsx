import React from "react";
import {
    Container,
    ContentType,
    ContentIcon,
    Icon,
    ContentTitle,
    Title,
    ContentInfo,
    Info,
    InfoDesc,
    ContentButton
} from "./styles";
import { Button } from "../Button";

export interface IProps {
    title: string;
    path: string;
    info: string;
    infoDesc: string;
    colorBtn: string;
    titleBtn: string;
    clickButton: any;
    widthBtn: any;
}

export function CardContentCourse({
    title,
    path,
    info,
    infoDesc,
    colorBtn,
    titleBtn,
    clickButton,
    widthBtn
}: IProps) {
    const click = true;

    return (
        <Container>
            <ContentType>
                <ContentIcon>
                    <Icon source={path} />
                </ContentIcon>
                <ContentTitle>
                    <Title>{title}</Title>
                </ContentTitle>
            </ContentType>
            <ContentInfo>
                <Info>{info}</Info>
                <InfoDesc>{infoDesc}</InfoDesc>
            </ContentInfo>
            <ContentButton>
                <Button
                    color={colorBtn}
                    title={titleBtn}
                    width={widthBtn}
                    onPress={clickButton(click)}
                />
            </ContentButton>
        </Container>
    )
}
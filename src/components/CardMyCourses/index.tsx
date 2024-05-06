import React from "react";
import {
    Container,
    ContentImageView,
    Img,
    ContentCategory,
    CategoryText,
    ContentTitle,
    Title,
    ContentTags,
    ContentInfo,
    InfoText,
    InfoTime,
    ContentCourse,
    ContenteIcon,
    Icon,
    LabelText,
    ContentButton,
} from './styles';
import { Button } from "../Button";
import theme from "../../global/styles/theme";

export interface IProps {
    image: any;
    info?: string;
    category: string;
    colorCategory: string;
    title: string;
    data: any;
    time: string;
    clickButton: any;
}

export function CardMyCourses({ image, info, colorCategory, category, title, data, time, clickButton }: IProps) {

    return (
        <Container>
            <ContentImageView>
                <Img source={{ uri: image }} />
            </ContentImageView>
            <ContentTitle>
                <Title>{title}</Title>
            </ContentTitle>
            <ContentInfo>
                <InfoText>MATRICULADO EM: <InfoTime>{data}</InfoTime></InfoText>
                <InfoText>DISPONÍVEL POR: <InfoTime>{time} DIAS</InfoTime></InfoText>
            </ContentInfo>
            <ContentTags>
                <ContentCategory type={colorCategory}>
                    <CategoryText>{category}</CategoryText>
                </ContentCategory>
            </ContentTags>
            <ContentCourse>
                <ContenteIcon>
                    <Icon source={require('../../assets/images/ebook.png')} />
                    <LabelText>E-book</LabelText>
                </ContenteIcon>
                <ContenteIcon>
                    <Icon source={require('../../assets/images/video.png')} />
                    <LabelText>Vídeos</LabelText>
                </ContenteIcon>
                <ContenteIcon>
                    <Icon source={require('../../assets/images/podcast.png')} />
                    <LabelText>Podcast</LabelText>
                </ContenteIcon>
                <ContenteIcon>
                    <Icon source={require('../../assets/images/multimidia.png')} />
                    <LabelText>Multimídia</LabelText>
                </ContenteIcon>
                <ContenteIcon>
                    <Icon source={require('../../assets/images/avaliacaofinal.png')} />
                    <LabelText>Avaliação final</LabelText>
                </ContenteIcon>
            </ContentCourse>
            <ContentButton>
                <Button color={theme.colors.success} title="Ir para o Curso" width={200} onPress={() => clickButton()} />
            </ContentButton>
        </Container>
    )
}

export default React.memo(CardMyCourses);
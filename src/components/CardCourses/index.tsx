import React from "react";
import {
    Container,
    ContentImageView,
    Img,
    ContentButton,
    ContentCategory,
    CategoryText,
    ContentText,
    Title,
    Info,
    ContentInfo,
    ContentInfoCourse,
    InfoCourse,
    ContentTimeDuration,
    ContentIcon,
    ContentTime,
    Time
} from './styles';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../global/styles/theme";
interface IProps {
    course: string;
    infoCourse: string;
    image: any;
    time: string;
    iconName: string;
    category: string;
    codCategory?: number;
    colorCategory: string;
    info?: any;
    hidden?: any;
    clickButton: any;
}

export function CardCourses({
    course,
    infoCourse,
    image,
    category,
    codCategory,
    colorCategory,
    time,
    iconName,
    info,
    hidden,
    clickButton
}: IProps) {

    return (
        <Container hidden={hidden}>
            <ContentImageView>
                <Img source={{ uri: image }} />
                <ContentButton onPress={() => clickButton()}>
                    <Icon
                        name="book-plus"
                        size={34}
                        color={`${theme.colors.background}`}
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 12,
                            }}
                        />
                </ContentButton>
                <ContentCategory type={colorCategory}>
                    <CategoryText key={codCategory}>{category}</CategoryText>
                </ContentCategory>
            </ContentImageView>
            <ContentText>
                <Title numberOfLines={3}>{course}</Title>
            </ContentText>
            <ContentText>
                <Info numberOfLines={4}>{infoCourse}</Info>
            </ContentText>
            <ContentInfo>
                {info &&
                    <ContentInfoCourse>
                        <InfoCourse>{info}</InfoCourse>
                    </ContentInfoCourse>
                }
                <ContentTimeDuration>
                    <ContentIcon>
                        <Icon
                            name={iconName}
                            size={34}
                            color={`${theme.colors.primary}`}
                            style={{
                                position: 'absolute',
                                right: 6,
                                alignSelf: 'center'
                            }} />
                    </ContentIcon>
                    <ContentTime>
                        <Time>Duracão: {time}h</Time>
                    </ContentTime>
                </ContentTimeDuration>
            </ContentInfo>
        </Container>
    )
}

export default React.memo(CardCourses);
import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex-direction: column;
    background-color: ${({theme} : any) => theme.colors.background};
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const ContentQuestion = styled.View`
    flex-direction: row;
    margin-left: 10px;
    margin-right: 10px;
`;

export const ContentNumberQuestion = styled.View`
    width: 10%;
`;

export const NumberQuestion = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const ContentQuestionText = styled.View`
    width: 90%;
    margin-right: 10px;
`;

export const QuestionText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const ContentRadioButton = styled.View``;
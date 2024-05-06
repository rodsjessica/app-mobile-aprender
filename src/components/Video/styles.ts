import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const ContentViewTitleCourse = styled.View`
    width: 90%;
    margin: 10px;

`;

export const TitleCourse = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentVideo = styled.View`
    width: 100%;
    height: 200px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContentIcon = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    position: absolute;
`;
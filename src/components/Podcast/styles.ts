import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: column;
    margin: 20px;
    align-items: flex-start;
    background-color: ${({ theme }: any) => theme.colors.background};
    padding-bottom: 15px;
`;

export const ContentView = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const ContentIcon = styled.View`
    margin-right: 15px;
`;

export const IconImage = styled.Image`
    margin: 10px;
`;

export const ContentTitle = styled.View`
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentViewPlayer = styled.TouchableOpacity`
    flex-direction: row;
    width: 90%;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ContentViewLogo = styled.ImageBackground`
    flex: 1;
    width: 258px;
    height: 60px;
    flex-direction: row;
`;

export const ContentPlayer = styled.View`
    height: 60px;
    width: 60px;
    background-color: ${({ theme }: any) => theme.colors.primary};
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

export const ContentPlayerAudio = styled.View`
    width: 100%;
    height: 200px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
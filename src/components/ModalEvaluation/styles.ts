import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: 'rgba(0, 0, 0, 0.5)';
`;

export const ContentView = styled.View`
    height: 520px;
    width: 340px;
    flex-direction: column;
    border-radius: 10px;
    background-color: ${({ theme }: any) => theme.colors.background};
    padding-bottom: 10px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const ContentTitle = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}: any) => theme.colors.gray};
`;

export const ContentInfo = styled.View`
    padding: 10px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}: any) => theme.colors.gray};
`;

export const Info = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const  ContentText = styled.View`
    padding-top: 5px;
    padding-bottom: 5px;
`;

export const InfoText = styled.Text`
    font-size: 16px;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const InfoImportant = styled.Text`
    font-size: 18px;
    color: ${({theme}: any) => theme.colors.attention};
    font-weight: bold;
`;

export const TextBold = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const ContentButton = styled.View`
 flex-direction: row;
 justify-content:center;
 padding: 10px;
`;

export const ButtonToClose = styled.TouchableOpacity`
    height: 60px;
    width: 60px;
`;
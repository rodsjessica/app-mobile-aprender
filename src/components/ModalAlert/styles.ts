import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    background-color: 'rgba(0, 0, 0, 0.5)';
`;

export const ContentView = styled.View`
    height: 110px;
    width: 220px;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    border-radius: 10px;
    background-color: ${({ theme }: any) => theme.colors.background};
`;

export const ContentInfo = styled.View`
    align-items: center;
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color:  ${({ theme }: any) => theme.colors.gray};
`;

export const InfoText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.dark};
`;

export const ContentButton = styled.View`
    align-items: center;
`;

export const PressableButton = styled.TouchableOpacity`
    width: 200px;
    height: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.fourth};
`;
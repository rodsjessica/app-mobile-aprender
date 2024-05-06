import styled from "styled-components/native";
import { Platform } from 'react-native';

export const ModalContainer = styled.View`
    height: auto;
    width: 85%;
    background-color: ${({ theme }: any) => theme.colors.background};
    flex-direction: column;
    margin-top: ${Platform.OS === 'ios' ? 130 : 65}px;
    margin-left: 30px;
`;

export const ContentProfile = styled.View`
    flex-direction: row;
    padding: 5px;
    padding-bottom: 5px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }: any) => theme.colors.gray};
    margin-left: 5px;
    margin-right: 5px;
`;

export const ContentLabel = styled.View`
    width: 50px;
    height: 50px;
    flex-direction: row;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 50px;
    border-color: ${({ theme }: any) => theme.colors.background};
    background-color: ${({ theme }: any) => theme.colors.attention};
`;

export const LabelText = styled.Text`
    align-self: center;
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.background};
`;

export const Content = styled.View`
    width: 80%;
    margin-left: 5px;
`;

export const ContentButton = styled.View`
    align-items: flex-end;
`;

export const ButtonToClose = styled.TouchableOpacity`
    height: 60px;
    width: 60px;
`;

export const ContentInfo = styled.View`
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }: any) => theme.colors.gray};
    margin-left: 5px;
    margin-right: 5px;
    padding-bottom: 10px;
`;

export const Name = styled.Text`
    font-weight: bold;
    font-size: 18px;
    padding-left: 5px;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const Email = styled.Text`
    font-size: 16px;
    padding-left: 5px;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentTitle = styled.TouchableOpacity`
    padding: 5px;
    margin: 5px;
`;

export const Title = styled.Text`
    font-size: 16px;
    padding-left: 5px;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;
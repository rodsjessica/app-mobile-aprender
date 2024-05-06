import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled.View``;

export const Input = styled(TextInput)`
    border-style: solid;
    border-width: 1px;
    width: 100%;
    height: 45px;
    background-color: ${({theme} : any) => theme.colors.gray_light};
    border-color: ${({theme} : any) => theme.colors.gray_light}; 
    border-bottom-color: ${({theme} : any) => theme.colors.gray}; 
    border-radius: 3px;
    padding: 5px;
    color: ${({theme}: any) =>  theme.colors.gray_dark};
    text-align: auto;
    overflow: hidden;
`;

export const Label = styled.Text`
    font-size: 16px;
    color: ${({theme}: any) =>  theme.colors.gray_dark};
    padding-bottom: 3px;
    padding-top: 10px;
`;
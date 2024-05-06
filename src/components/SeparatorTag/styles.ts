import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-color: ${({theme} : any) => theme.colors.gray};
    padding: 5px;
    margin: 20px;
`;

export const ContentInformation = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme} : any) => theme.colors.attention};
`;

export const ContentIcon = styled.View`
    width: 40px;
    height: 40px;
`;
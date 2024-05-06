import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: column;
    margin: 20px;
    align-items: flex-start;
    background-color: ${({ theme }: any) => theme.colors.background};
`;

export const ContentType = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const ContentIcon = styled.View`
    margin-right: 15px;
`;

export const Icon = styled.Image`
    margin: 10px;
`;

export const ContentTitle = styled.View`
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentInfo = styled.View`
    margin: 10px;
`;

export const Info = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const InfoDesc = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentButton = styled.View`
    align-self: center;
`;
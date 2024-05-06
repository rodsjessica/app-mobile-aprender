import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: ${({ theme }: any) => theme.colors.gray_light};
`;

export const ContentTitle = styled.View`
`;

export const TitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentIcon = styled.View`
    width: 40px;
    height: 40px;
`;
import styled from "styled-components/native";

export const Container = styled.View`
 height: 50px;
 flex-direction: row;
`;

export const ContentTitle = styled.View`
 align-self: center;
 margin-left: 30px;
`;

export const Title = styled.Text`
    color: ${({ theme }: any) => theme.colors.background};
    font-size: 20px;
    font-weight: bold;
`;

export const ContentIcon = styled.TouchableOpacity`
 height: 45px;
 width: 50px;
`;

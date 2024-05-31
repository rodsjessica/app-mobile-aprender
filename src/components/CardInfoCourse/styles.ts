import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${({ theme }: any) => theme.colors.background};
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}: any) => theme.colors.gray_dark};
    margin: 15px;
`;

export const ContentTitle = styled.View`
    flex-direction: row;
    margin: 5px;
    padding-top: 20px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentDesc = styled.View`
    flex-direction: column;
    margin: 5px;
`;

export const Description = styled.Text`
   font-size: 18px;
   color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ButtonSeeMore = styled.TouchableOpacity``;

export const TextSeeMore = styled.Text`
    font-size: 18px;
    color: ${({theme}: any) => theme.colors.blue_light};
`;

export const ContentType = styled.View`
    margin: 5px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Info = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentIcon = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 40px;
`;

export const ContentCategory = styled.View`
`;

export const Category = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentTime = styled.View`
`;

export const Time = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentTeacher = styled.View`
`;

export const Teacher = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;
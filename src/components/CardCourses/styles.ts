import styled from "styled-components/native";
import { Platform } from "react-native";

export interface CategoryProps {
    type: string;
    hidden?: any;
}

export const Container = styled.View<CategoryProps>`
    flex: 1;
    display: ${({ hidden }: any) => hidden ? 'none' : 'flex'};
    flex-direction: column;
    margin: 10px;
    background-color: ${({ theme }: any) => theme.colors.background};
    border-color:  ${({ theme }: any) => theme.colors.gray_light};
`;

export const ContentImageView = styled.View`
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.background};
`;

export const Img = styled.Image`
    height: 200px;
    width: 350px;
    margin: 20px;
`;

export const ContentButton = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    position: absolute;
    right: 10px;
    margin-top: 20px;
`;

export const ContentCategory = styled.View<CategoryProps>`
    padding: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 15px;
    position: absolute;
    bottom: 50px;
    right: 30px;
    background-color: ${({ type }: any) => type};
`;

export const CategoryText = styled.Text`
    font-size: 16px;
    color: ${({ theme }: any) => theme.colors.background};
`;

export const ContentText = styled.View`
    margin: 10px;
    background-color: ${({ theme }: any) => theme.colors.background};
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const Info = styled.Text`
    font-size: 18px;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentInfo = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

export const ContentInfoCourse = styled.View`
    height: 40px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: ${Platform.OS === 'ios' ? 60 : 80}px;
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;

export const InfoCourse = styled.Text`
    font-size: 16px;
    color: ${({ theme }: any) => theme.colors.background};
`;

export const ContentTimeDuration = styled.View`
    flex-direction: row;
    margin: 10px;
`;

export const ContentIcon = styled.View`
    align-items: center;
    width: 40px;
    height: 40px;
`;

export const ContentTime = styled.View`
    align-self: center;
    padding-right: 10px;
`;

export const Time = styled.Text`
    font-size: 14px;
`;
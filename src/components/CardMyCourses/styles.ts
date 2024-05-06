import { Platform } from "react-native";
import styled from "styled-components/native";

export interface CategoryProps {
    type: string;
}

export const Container = styled.View`
 flex: 1;
 flex-direction: column;
 margin: 10px;
 background-color: ${({ theme }: any) => theme.colors.background};
`;

export const ContentImageView = styled.View`
 align-items: center;
 background-color: ${({ theme }: any) => theme.colors.background};
`;

export const Img = styled.Image`
 height: 200px;
 width: 350px;
 margin: 10px;
`;

export const ContentTitle = styled.View`
 margin: 5px;
 margin-left: 20px;
 margin-right: 20px;
`;

export const Title = styled.Text`
 font-size: 20px;
 font-weight: bold;
 color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentInfo = styled.View`
 margin: 5px;
 margin-left: 20px;
 margin-right: 20px;
`;

export const InfoText = styled.Text`
 font-size: 14px;
 font-weight: bold;
 color: ${({ theme }: any) => theme.colors.gray_dark};
 padding: 3px;
`;

export const InfoTime = styled.Text`
 font-size: 14px;
 font-weight: 400;
 color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentTags = styled.View`
 flex-direction: row;
 justify-content: flex-start;
 margin: 20px;
 margin-top: 5px;
 margin-bottom: 10px;
`;

export const ContentCategory = styled.View<CategoryProps>`
 margin-right: 15px;
 padding: 15px;
 padding-top: 5px;
 padding-bottom: 5px;
 background-color: ${({ type }: any) => type};
`;

export const CategoryText = styled.Text`
 font-size: 16px;
 color: ${({ theme }: any) => theme.colors.background};
`;

export const ContentCourse = styled.View`
 flex-direction: row;
 flex-wrap: wrap;
`;

export const ContenteIcon = styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
 margin: 10px;
 margin-top: 5px;
 margin-bottom: 5px;
`;

export const Icon = styled.Image`
 margin: 10px;
`;

export const LabelText = styled.Text`
 font-size: 16px;
`;

export const ContentButton = styled.View`
 flex-direction: row;
 justify-content:center;
`;
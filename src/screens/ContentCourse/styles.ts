import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex-direction: column;
    background-color: ${({theme} : any) => theme.colors.gray_light};
`;

export const ContentButton = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const ContentTitle = styled.View`
    margin-right: 20px;
    margin-left: 20px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}: any) => theme.colors.gray_dark};
`;

export const ContentDesc = styled.View`
    margin: 10px;
    margin-right: 20px;
    margin-left: 20px;
`;

export const Description = styled.Text`
   font-size: 18px;
   font-weight: 400;
   color: ${({theme}: any) => theme.colors.gray_dark};
   margin-top: 10px;
`;

export const ContentView = styled.View`
  flex: 1;
`;

export const  ContentViewVideo = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    margin: 20px;
    align-items: flex-start;
    background-color: ${({ theme }: any) => theme.colors.background};
    padding-bottom: 20px;
    padding: 10px;
`;

export const ContentViewInfo = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContentImage = styled.View`
    margin-right: 15px;
`;

export const IconImage = styled.Image`
    margin: 10px;
`;

export const ContentVideoTitle = styled.View`
`;

export const ContentCourseRecommended = styled.View`
    flex-direction: column;
`;
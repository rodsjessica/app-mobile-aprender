import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex-direction: column;
    background-color: ${({ theme }: any) => theme.colors.gray_light};
`;

export const ContentEvaluationTitle = styled.View`
 height: 50px;
 flex-direction: row;
 justify-content: center;
`;

export const ContentTitleEvaluation = styled.View`
 align-self: center;
`;

export const TitleEvaluation = styled.Text`
    color: ${({ theme }: any) => theme.colors.background};
    font-size: 20px;
    font-weight: bold;
`;

export const ContentTitle = styled.View`
    margin: 20px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const ContentView = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
`;

export const ContentButton = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 30px;
`;
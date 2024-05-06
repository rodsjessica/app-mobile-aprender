import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${({theme} : any) => theme.colors.background};
    padding-bottom: 20px;
`;

export const ContentScrollView = styled.ScrollView``;

export const Content = styled.View`
    width: 90%;
    align-self: center;
`;

export const HeaderProfile = styled.View`
    height: 20%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({theme} : any) => theme.colors.gray_dark};
`;

export const ContentViewLetter = styled.View`
    width: 70px;
    height: 70px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-radius: 70px;
    background-color: ${({theme} : any) => theme.colors.attention};
    margin: 10px;
`;

export const ContentViewInfo = styled.View`
    width: 70%;
    margin: 10px;
    align-items: flex-start;
`;

export const ContentLetter = styled.Text`
    font-size: 26px;
    color: ${({theme} : any) => theme.colors.background};
`;

export const ContentName = styled.Text`
    font-size: 20px;
    color: ${({theme} : any) => theme.colors.background};
    padding: 2px;
`;

export const ContentEmail = styled.Text`
    font-size: 16px;
    color: ${({theme} : any) => theme.colors.background};
    padding: 2px;
`;

export const ContentInfo = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({theme} : any) => theme.colors.background};
    padding: 2px;
`; 

export const ContentData = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color: ${({theme} : any) => theme.colors.background};
    padding-left: 5px;
`;

export const ContentLevelEducation = styled.Text`
    font-size: 16px;
    color: ${({theme} : any) => theme.colors.background};
    padding: 2px;
`;

export const ContentViewInformation = styled.View`
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

export const ContentSelectList = styled.View`
    width: 90%;
    align-self: center;
    padding-top: 15px;
`;

export const LabelText = styled.Text`
    font-size: 16px;
    color: ${({theme} : any) => theme.colors.gray_dark};
    padding: 2px;
`;

export const ContentViewButton = styled.View`
    align-self: center;
    margin: 10px;
`;

export const ContentViewButtonUnderlined = styled.View`
    align-self: center;
    margin-left: 15px;
`;

export const ContentView = styled.View`
    align-self: center;
`;
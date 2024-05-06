import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme} : any) => theme.colors.gray_light};
  padding-bottom: 10px;      
`;

export const ContentView = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-size: 18px;
  color: ${({theme} : any) => theme.colors.gray_dark}; ;
`;

export const TextArea = styled(TextInput).attrs({
  textAlignVertical:"top"
})`
  width: 90%;
  height: 220px;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({theme} : any) => theme.colors.background};
  margin: 15px;
  font-size: 18px;
  padding: 10px;
`;

export const ContentButton = styled.View`
  flex-direction: row;
  justify-content: center;
`;
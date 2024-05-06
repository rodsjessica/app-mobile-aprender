import styled from "styled-components/native";

export const Container = styled.View`
 flex: 1;
 background-color: ${({theme} : any) => theme.colors.gray_light};
`;

export const ContentView = styled.View`
  flex: 1;
`;
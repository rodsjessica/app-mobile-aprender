import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme} : any) => theme.colors.gray_light};      
`;

export const ContentScrollView = styled.ScrollView``;

export const ContentView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
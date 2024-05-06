import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }: any) => theme.colors.gray_light};      
`;

export const ContentSelect = styled.View`
 width: 90%;
 justify-content: center;
 align-self: center;
 padding: 10px;
`;

export const ContentView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
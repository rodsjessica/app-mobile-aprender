import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme} : any) => theme.colors.primary};      
`;

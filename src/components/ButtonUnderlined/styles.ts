import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.gray_dark};
  text-decoration: underline;
  text-decoration-color: ${({ theme }: any) => theme.colors.gray_dark};
`;
import styled from 'styled-components/native';
import { Platform } from 'react-native';

interface IProps {
  color: any;
  width: number;
}

export const Container = styled.TouchableOpacity<IProps>`
  width: ${(props: { width: number }) => props.width}px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props: { color: any }) => props.color};
  margin: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.background};
`;
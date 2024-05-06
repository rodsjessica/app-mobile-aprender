import styled from 'styled-components/native';

import { TextInput } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  height: 60px;
  background-color: ${({ theme }: any) => theme.colors.gray_light};
  border-color: ${({ theme }: any) => theme.colors.gray_dark};
`;

export const InputView = styled.View`
  background-color: ${({ theme }: any) => theme.colors.gray_light};
  width:100%;
`;

export const ContentInput = styled(TextInput)`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color:  ${({ theme }: any) => theme.colors.gray_dark};
  background-color: ${({ theme }: any) => theme.colors.gray_light};
  padding-left: 60px;
  font-size: 18px;
  font-weight: bold;
`;

export const TouchableOpacityIcon = styled.TouchableOpacity`
  width: 50px;
  height: 58px;
  position: absolute;
  right: 2px;
  top: 2px;
  bottom: 8px;
  align-self: center;
  background-color: ${({ theme }: any) => theme.colors.gray_light};
`;
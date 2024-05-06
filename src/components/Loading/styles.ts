import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: ${({ theme }: any) => theme.colors.background};
`;

export const Info = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }: any) => theme.colors.gray_dark};
`;
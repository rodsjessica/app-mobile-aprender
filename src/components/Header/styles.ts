import styled from 'styled-components/native';

export const Container = styled.View`
  height: 10%;
  background-color: ${({ theme }: any) => theme.colors.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const Title = styled.Text`
 font-size: 18px;
 font-weight: bold;
 color: ${({ theme }: any) => theme.colors.background};
`;

export const ImageLogo = styled.Image`
  width: 180px;
  height: 80px;
`;

export const ContentIcon = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;
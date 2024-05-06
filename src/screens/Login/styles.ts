import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.background};

`;

export const ContentLogo = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 15px;

`;

export const Logo = styled.Image`
  width: 310px;
  height: 100px;
`;

export const ViewContentInput = styled.View`
 margin-top: 40px;
`;

export const ContentInput = styled.View`
  width: 80%;
  margin-top: 15px;
`;

export const ContentPrivacyPolicy = styled.View`
  width: 80%;
  margin-top: 20px;
  flex-direction: row;  
  justify-content: center;
  align-items: center;
`;

export const ContentButton = styled.View`
 width: 100%;
 justify-content: center;
 align-items: center;
 margin-top: 30px;
`;

export const ContentButtonForgotPassword = styled.View`
  width: 70%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

// layout Modal

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: first baseline;
  align-items: center;
  height: 50px;
  background-color: ${({ theme }: any) => theme.colors.attention};
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const ModalContentIcon = styled.View`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

export const ModalView = styled.View`
  flex: 1;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.colors.background};
  height: 180px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.background};
`;

export const ModalSubtitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.gray_dark};
  padding-bottom: 15px;
`;

export const ModalInfo = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.colors.gray_dark};
  padding-bottom: 5px;
`;
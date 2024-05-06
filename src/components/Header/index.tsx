import React from 'react';

import {
  Container,
  Title,
  ImageLogo,
  ContentTitle,
  ContentIcon
} from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../global/styles/theme';
// import { useAuth } from '../../contexts/AuthProvider';

interface Props {
  title?: string;
  iconName?: any;
  childToParent: any;
}

export function Header({ title, iconName, childToParent, ...rest }: Props) {
  const click = true;
  // const {signOut} = useAuth();
  function signOut() { }

  return (
    <Container>
      <ContentTitle>
        {/* <Title>{title}</Title> */}
        <ImageLogo source={require('../../assets/images/logo_white.png')}></ImageLogo>
      </ContentTitle>
      <ContentIcon onPress={() => childToParent(click)}>
        <Icon
          name={iconName}
          size={34}
          color={`${theme.colors.background}`}
          style={{
            position: 'absolute',
            left: 10,
            top: 12,
          }} />
      </ContentIcon>
    </Container>
  )
}
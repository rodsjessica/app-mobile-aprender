import React from "react";
import { ActivityIndicator } from 'react-native';

import {Container, Info} from './styles'
import theme from "../../global/styles/theme";

export interface IProps{
  isLoading?: boolean;
}


export function Loading({isLoading}: IProps) {

  if(isLoading === false){
    return ;
  }

  return (
    <Container>
      <ActivityIndicator
        size="large"
        color={theme.colors.secondary}
        hidesWhenStopped={true}
      />
      <Info>Carregando ...</Info>
    </Container>
  )
}
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {Container, Title} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  color: any;
  width: any;
  onPress: () => void;
}

export function Button({title, color, width, onPress, ...rest}: Props) {
  
  return (
    <Container color={color} width={width} onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
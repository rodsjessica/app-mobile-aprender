import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import * as S from "./styles";

import theme from '../../global/styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// type Props = TextInputProps;

interface Props extends TextInputProps {
  iconName: string;
  secureTextEntry?: boolean;
}

export function Input({ iconName, secureTextEntry, ...rest }: Props) {
  const [responseSecure, setResponseSecure] = useState(secureTextEntry);

  return (
    <S.Container>
      <S.InputView>
        <S.ContentInput {...rest} secureTextEntry={responseSecure} />
      </S.InputView>
      <Icon
        name={iconName}
        size={36}
        color={`${theme.colors.gray_dark}`}
        style={{
          position: 'absolute',
          left: 10,
          top: 12,
        }} />
      {secureTextEntry &&
        <S.TouchableOpacityIcon
          onPress={() => setResponseSecure(!responseSecure)}
        >
          <Icon
            name={responseSecure ? "eye-off" : "eye"}
            size={36}
            color={`${theme.colors.gray_dark}`}
            style={{
              position: 'absolute',
              right: 10,
              top: 12,
            }}
          />
        </S.TouchableOpacityIcon>
      }
    </S.Container>
  );
}
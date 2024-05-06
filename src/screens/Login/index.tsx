import React, { useState, useRef } from "react";
import { Linking, SafeAreaView, StatusBar } from 'react-native';

import Toast from 'react-native-toast-message';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as S from "./styles";

import theme from '../../global/styles/theme';
import { Input } from "../../components/Input";
import { ButtonUnderlined } from "../../components/ButtonUnderlined";
import { Button } from "../../components/Button";

import { useAuth } from "../../contexts/AuthProvider";

export function Login() {
    const { signIn } = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const modalizeRef = useRef<Modalize>(null);
    const [isVisible, setIsVisible] = useState(false);

    function openModal() {
        setIsVisible(true)
        modalizeRef.current?.open();
    }

    function handlePrivacyPolicy() {
        Linking.openURL('http://www.fenabrave.org.br/politica-de-privacidade.html');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.background} />
            <S.Container>
                <S.ContentLogo>
                    <S.Logo source={require('../../assets/images/logo.png')} />
                </S.ContentLogo>
                <S.ViewContentInput>
                    <S.ContentInput>
                        <Input
                            iconName='account'
                            placeholder='Usuário'
                            placeholderTextColor={`${theme.colors.gray_dark}`}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={username}
                            onChangeText={user => setUsername(user)}
                        />
                    </S.ContentInput>
                    <S.ContentInput>
                        <Input
                            iconName='lock-outline'
                            placeholder='Senha'
                            placeholderTextColor={`${theme.colors.gray_dark}`}
                            secureTextEntry={true}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </S.ContentInput>
                </S.ViewContentInput>
                <S.ContentPrivacyPolicy>
                    <ButtonUnderlined title='Li e aceito os termos e condições de política de Privacidade' onPress={handlePrivacyPolicy} />
                </S.ContentPrivacyPolicy>
                <S.ContentButton>
                    <Button
                        title='Entrar'
                        color={theme.colors.primary}
                        width={320}
                        onPress={() => signIn(username, password)}
                    />
                </S.ContentButton>
                <Toast />
                <S.ContentButtonForgotPassword>
                    <ButtonUnderlined title='Esqueci minha senha' onPress={openModal} />
                </S.ContentButtonForgotPassword>
                {
                    isVisible &&
                    <>
                        <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor={'transparent'} />
                        <Modalize
                            ref={modalizeRef}
                            snapPoint={180}
                            adjustToContentHeight={true}
                            HeaderComponent={
                                <S.ModalHeader>
                                    <S.ModalContentIcon>
                                        <Icon
                                            name="alert"
                                            size={30}
                                            color={`${theme.colors.background}`}
                                            style={{
                                                position: 'absolute',
                                                left: 10,
                                                top: 12,
                                            }}
                                        />
                                    </S.ModalContentIcon>
                                    <S.ModalTitle>Caro Aluno,</S.ModalTitle>
                                </S.ModalHeader>
                            }
                        >
                            <S.ModalView>
                                <S.ModalSubtitle>Por gentileza, entrar em contato com a Universidade.</S.ModalSubtitle>
                                <S.ModalInfo>Tel: 11 5582-0063</S.ModalInfo>
                                <S.ModalInfo>Tel: 11 5582-0045</S.ModalInfo>
                            </S.ModalView>
                        </Modalize>
                    </>
                }
            </S.Container>
        </SafeAreaView>
    )
}
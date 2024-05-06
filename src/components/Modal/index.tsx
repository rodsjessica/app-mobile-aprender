import React, { useState } from "react";
import { Modal } from "react-native";

import {
    ModalContainer,
    ButtonToClose,
    ContentButton,
    ContentInfo,
    Name,
    Email,
    ContentTitle,
    Title,
    ContentProfile,
    ContentLabel,
    LabelText,
    Content,

} from './styles';
import theme from '../../global/styles/theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthProvider";
interface IProps {
    visible: any;
    iconName?: any;
    touchToClose: any;
    name: string | undefined;
    email: string | undefined;
    handleShowProfile: any;
    handleShowSolicitation: any;
    letter: any;
}

export function ModalMenu({
    visible,
    iconName,
    name,
    email,
    touchToClose,
    handleShowProfile,
    handleShowSolicitation,
    letter,
}: IProps) {
    const { signOut } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const click = true;

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={() => {
                setModalVisible(!visible)
            }}
        >
            <ModalContainer>
                <ContentButton>
                    <ButtonToClose onPress={() => touchToClose(click)}>
                        <Icon
                            name={iconName}
                            size={34}
                            color={`${theme.colors.attention}`}
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: 12,
                            }} />
                    </ButtonToClose>
                </ContentButton>
                <ContentProfile>
                    <ContentLabel>
                        <LabelText>{letter}</LabelText>
                    </ContentLabel>
                    <Content>
                        <Name>{name}</Name>
                        <Email>{email}</Email>
                    </Content>
                </ContentProfile>
                <ContentInfo>
                    <ContentTitle onPress={() => handleShowProfile(click)}>
                        <Title>Perfil</Title>
                    </ContentTitle>
                </ContentInfo>
                <ContentInfo>
                    <ContentTitle onPress={() => handleShowSolicitation(click)}>
                        <Title>Solicitações</Title>
                    </ContentTitle>
                </ContentInfo>
                <ContentTitle onPress={() => signOut()}>
                    <Title>Sair</Title>
                </ContentTitle>
            </ModalContainer>
        </Modal>
    )
}
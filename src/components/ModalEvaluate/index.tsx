import React, { useState } from "react";
import { Modal } from "react-native";

import {
    Container,
    ContentView,
    Title,
    ContentTitle,
    ContentInfo,
    Info,
    ContentText,
    InfoText,
    InfoImportant,
    TextBold,
    ContentButton,
    ButtonToClose,
} from "./styles";

import { Button } from "../Button";
import theme from "../../global/styles/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
    visible: any;
    attempts: any;
    attemptsMade: string;
    clickButton: any;
    touchToClose: any;
}

export function ModalEvaluate({
    visible,
    attempts,
    attemptsMade,
    clickButton,
    touchToClose
}: IProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [qtdAttempts, setQtdAttempts] = useState(Number(attemptsMade));
    const click = true;

    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent
            onRequestClose={() => {
                setModalVisible(!visible)
            }}
        >
            <Container>
                <ContentView>
                    <ContentTitle>
                        <Title>Avaliação Final</Title>
                        <ButtonToClose onPress={() => touchToClose(click)}>
                            <Icon
                                name="close-box"
                                size={34}
                                color={`${theme.colors.attention}`}
                                style={{
                                    position: 'absolute',
                                    left: 10,
                                    top: 12,
                                }} />
                        </ButtonToClose>
                    </ContentTitle>
                    <ContentInfo>
                        <Info>Informações:</Info>
                        <ContentText>
                            <InfoText>— Você tem {3 - attempts} tentativas.</InfoText>
                        </ContentText>
                        <ContentText>
                            <InfoText>
                                —  A nota da sua última avaliação será seu resultado final.
                            </InfoText>
                        </ContentText>
                        <ContentText>
                            <InfoText>—  A avaliação possui 10 perguntas.</InfoText>
                        </ContentText>
                        <ContentText>
                            <InfoText>— A nota vale 10,00 pontos.</InfoText>
                        </ContentText>
                    </ContentInfo>
                    <ContentInfo>
                        <InfoImportant>Importante:</InfoImportant>
                        <ContentText>
                            <InfoText>
                                — Você já realizou <TextBold>{attemptsMade}</TextBold> tentativa(s) desta avaliação.
                            </InfoText>
                        </ContentText>
                        <ContentText>
                            <InfoText>
                                — Ao clicar em <TextBold>começar</TextBold>, a sua tentativa de realização estará valendo.
                            </InfoText>
                        </ContentText>
                    </ContentInfo>
                    {
                        qtdAttempts !== 0 &&
                        <ContentButton>
                            <Button
                                color={theme.colors.attention}
                                title="Começar"
                                width={200}
                                onPress={() => clickButton()}
                            />
                        </ContentButton>
                    }
                </ContentView>
            </Container>
        </Modal>
    )
}
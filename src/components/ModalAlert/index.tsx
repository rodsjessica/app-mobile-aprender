import React, { useState } from "react";
import { Modal } from "react-native";

import {
    Container,
    ContentView,
    ContentInfo,
    InfoText,
    ContentButton,
    PressableButton,
    TextButton
} from "./styles";

interface IProps {
    visible: any;
    info: string;
    touchToClose: any;
}

export function ModalAlert({ info, visible, touchToClose }: IProps) {
    const [modalVisible, setModalVisible] = useState(false);
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
                    <ContentInfo>
                        <InfoText>{info}</InfoText>
                    </ContentInfo>
                    <ContentButton>
                        <PressableButton onPress={() => touchToClose(click)}>
                            <TextButton>OK</TextButton>
                        </PressableButton>
                    </ContentButton>
                </ContentView>
            </Container>
        </Modal>
    )
}
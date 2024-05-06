import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import {
    Container,
    ContentView,
    InfoText,
    TextArea,
    ContentButton
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

import { CardInfoCourse } from "../../components/CardInfoCourse";
import { Button } from "../../components/Button";
import { HeaderNavigation } from "../../components/HeaderNavigation";

import theme from "../../global/styles/theme";
import { useAuth } from "../../contexts/AuthProvider";
import { newSolicitationService } from "../../services/newSolicitationService";

export interface IDataNewSolicitation{
    statusCode: number;
    message: string;
    data: boolean;
}
export interface IPropsNewSolicitation{
    statusCode: number;
    message: string;
    data: IDataNewSolicitation;
}

export function NewSolicitation({ route }: any) {
    const { auth } = useAuth();
    const navigation = useNavigation();
    const [motive, setMotive] = useState('');

    const childToParent = (click: boolean) => {
        navigation.navigate('Home');
    }

    async function postNewSolicitation() {
        if (motive === '') {
            return showMessage({
                message: "Por favor, preencha o campo vazio.",
                type: "danger",
            });
        }

        if(motive.length < 20 || motive.length > 500){
            return showMessage({
                message: "É necessário ter no mínimo 20 caracteres.",
                type: "danger",
            });
        }

        const token: any = auth?.data.token;

        const body = {
            "token": token,
            "codCurso": route.params?.codigo,
            "motivo": motive
        }
        
        const resp = await newSolicitationService.postNewSolicitation(body);

        if (resp.message === "Sucesso na requisição") {
            setMotive('');
            
            return showMessage({
                message: "Sua solicitação foi enviada com sucesso!",
                type: "success",
            });
        }

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Solicitar Inscrição" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                <ContentView>
                    <CardInfoCourse
                        title={route.params?.titulo}
                        description={route.params?.descricao}
                        category={route.params?.categoria}
                        time={route.params?.cargaHoraria}
                        teacher={route.params?.professor}
                    />
                    <InfoText>
                        Informe o motivo de sua solicitacão abaixo:
                    </InfoText>
                    <TextArea
                        value={motive}
                        onChangeText={(motive: any) => setMotive(motive)}
                        multiline={true}
                        numberOfLines={10}
                        maxLength={500}
                    />
                    <InfoText>
                        Mínimo de 20 caracteres e máximo 500 caracteres.
                    </InfoText>
                    <ContentButton>
                        <Button title="Inscreva-se" onPress={() => postNewSolicitation()} width={200} color={theme.colors.success} />
                    </ContentButton>
                </ContentView>
            </Container>
            <FlashMessage position="center" />
        </SafeAreaView>
    )
}
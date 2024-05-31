import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import {
    Container,
    ContentTitleEvaluation,
    ContentEvaluationTitle,
    TitleEvaluation,
    Title,
    ContentTitle,
    ContentView,
    ContentButton,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

import theme from "../../global/styles/theme";

import { useAuth } from "../../contexts/AuthProvider";
import { evaluationService } from "../../services/evaluationService";

import { CardEvaluation } from "../../components/CardEvaluation";
import { Loading } from "../../components/Loading";
import { Button } from "../../components/Button";
export interface IDataRespostas {
    ativo: boolean;
    atualizadoEm: any;
    atualizadoPor: any;
    codQuestao: number;
    codigo: number;
    correta: boolean;
    criadoEm: string;
    criadoPor: number;
    posicao: any;
    titulo: string;
}
export interface IDataProps {
    ativo: boolean;
    atualizadoEm: any;
    atualizadoPor: any;
    codAvaliacao: number;
    codigo: number;
    comentario: any;
    criadoEm: string;
    criadoPor: number;
    nota: any;
    posicao: any;
    respostas: IDataRespostas[];
    tipo: string;
    titulo: string;
}
export interface IDataEvaluation {
    data?: IDataProps[];
    message: string;
    statusCode: number;
}


export function Evaluation({ route }: any) {
    const { auth, intervalRef } = useAuth();
    const navigation = useNavigation();

    const [dataEvaluation, setDataEvaluation] = useState<IDataEvaluation>();
    const token: any = auth?.data.token;

    const getEvaluation = useCallback(async () => {
        try {
            const resp = await evaluationService.getDataEvaluation(token, route.params?.codigo);
            setDataEvaluation(resp);

        } catch (error) {
            console.error('Erro ao buscar avaliação:', error);
        }
    }, [token, route.params?.codigo]);

    useEffect(() => {
        getEvaluation();

        clearInterval(intervalRef.current);
        intervalRef.current = null;
     
    }, [getEvaluation])

    const submitEvaluation = () => {
        // return showMessage({
        //     message: "Avaliação enviada com sucesso!",
        //     type: "success",
        // });

        return navigation.navigate('Lançamentos');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <ContentEvaluationTitle>
                <ContentTitleEvaluation>
                    <TitleEvaluation>Avaliação</TitleEvaluation>
                </ContentTitleEvaluation>
            </ContentEvaluationTitle>
            <Container>
                <ContentTitle>
                    <Title>{route.params?.titulo}</Title>
                </ContentTitle>
                {
                    dataEvaluation?.data === undefined || null ? (
                        <ContentView>
                            <Loading />
                        </ContentView>
                    ) : (
                        dataEvaluation?.data?.map(
                            (item: any, index: any) => {

                                const response = item.respostas;
                                const titulo = response.map((item: any) => item.titulo);
                                const codQuestao = response.map((item: any) => item.codQuestao);
                                // const codigo = response.map((item: any) => item.codigo);

                                if (item.codigo === codQuestao[0]) {

                                    return (
                                        <CardEvaluation
                                            key={item.titulo}
                                            numberQuestion={index + 1}
                                            question={item.titulo.replace(/<[^>]+>/g, "")}
                                            alternative={titulo}
                                        />
                                    )
                                }

                            }

                        )
                    )
                }
                <ContentButton>
                    <Button
                        color={theme.colors.attention}
                        title="Finalizar"
                        width={200}
                        onPress={submitEvaluation}
                    />
                </ContentButton>
            </Container>
            <FlashMessage position="center" />
        </SafeAreaView>
    )
}
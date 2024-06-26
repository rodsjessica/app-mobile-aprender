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
import { showMessage } from "react-native-flash-message";

import theme from "../../global/styles/theme";

import { useAuth } from "../../contexts/AuthProvider";
import { evaluationService } from "../../services/evaluationService";
import { responseEvaluationService } from "../../services/responseEvaluationService";

import { CardEvaluation } from "../../components/CardEvaluation";
import { Loading } from "../../components/Loading";
import { Button } from "../../components/Button";
import { ModalAlert } from "../../components/ModalAlert";

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
    codMatAvaliacao: number;
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

export interface IDataResponseEvaluation {
    data: string;
    message: string;
    statusCode: number;
}


export function Evaluation({ route }: any) {
    const { auth, intervalRef } = useAuth();
    const navigation = useNavigation();

    const [dataEvaluation, setDataEvaluation] = useState<IDataEvaluation>();
    const [respEvaluation, setRespEvaluation] = useState<Array<{ questao: string, resposta: string, codigo: number }>>([]);
    const [respData, setRespData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
   
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

    }, [getEvaluation]);

    const handleValueChange = (codeQuestion: string, codeResponse: string, codEvaluation: number) => {
        setRespEvaluation(prevResponses => {
            const newResponses = prevResponses
            .filter(resp => resp.questao !== codeQuestion || resp.codigo !== codEvaluation)
 
            const orderedResponse = {
                questao: codeQuestion,
                resposta: codeResponse,
                codigo: codEvaluation
            }
            
            return [...newResponses, orderedResponse];
        });
    };

    const submitEvaluation = async () => {

        if (respEvaluation.length === 10) {
            const resp = await responseEvaluationService.postResponseEvaluation(respEvaluation);

            if(resp.message === "Sucesso na requisição"){
                setRespData(resp.data)
                setModalVisible(true);

            }

        } else {
            return showMessage({
                message: "Por favor, responder todas as questões!",
                type: "danger",
                duration: 3000,
            });
        }




    }

    const touchToClose = () => {
        setModalVisible(false);

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
                    modalVisible &&
                    <ModalAlert
                        info={`Nota da sua avaliação: ${respData}`}
                        visible={modalVisible}
                        touchToClose={touchToClose} />
                }
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
                                const codigo = response.map((item: any) => item.codigo);

                                if (item.codigo === codQuestao[0]) {

                                    return (
                                        <CardEvaluation
                                            key={item.titulo}
                                            codEvaluation={item.codMatAvaliacao}
                                            numberQuestion={index + 1}
                                            codeQuestion={String(item.codigo)}
                                            question={item.titulo.replace(/<[^>]+>/g, "")}
                                            alternative={titulo}
                                            codeAlternative={codigo}
                                            onValueChange={handleValueChange}
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
        </SafeAreaView>
    )
}
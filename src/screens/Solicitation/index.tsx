import React, { useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, SafeAreaView, StatusBar } from "react-native";

import {
    Container,
    TableHeader,
    ViewInfo,
    TextInfo,
    TableRow,
    FirstColumn,
    SecondColumn,
    ContentView,
} from './styles';

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { Loading } from "../../components/Loading";

import theme from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";


import { useAuth } from "../../contexts/AuthProvider";
import { solicitationService } from "../../services/SolicitationService";

export interface IDataLista {
    autorizado: any;
    autorizadoEm: string;
    categoria: string;
    categoriaCor: string;
    codCurso: string;
    codigo: string;
    cursoNovo: boolean;
    motivoAluno: string;
    motivoMaster: boolean;
    solicitadoEm: string;
    titulo: string;
    visualizadoAluno: boolean;
    visualizadoMaster: boolean;
}
export interface IData {
    lista: IDataLista[];
    pagina: number;
    paginas: number;
    registros: string;
}
export interface IProps {
    data?: IData;
    message: string;
    statusCode: string;
}

export function Solicitation() {
    const { auth } = useAuth();
    const navigation = useNavigation();
    const [data, setData] = useState<IDataLista[]>();
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);

    async function getData() {

        if (!hasMoreData) return;

        const token: any = auth?.data.token;
        const resp = await solicitationService.getSolicitation(token, page, 6);

        if (resp.data?.lista) {
            const current = resp.data.lista;

            if (data === undefined) {
                setData(current);

            } else {
                setData(data => [...data as any, ...current as any])
            }

            if (resp.data?.paginas) {
                setPage(prev => prev + 1)
            }

            if (page === resp.data.paginas || resp.data.paginas === 0) {
                setHasMoreData(false)
            }
        }

        return resp;

    }

    useEffect(() => {
        if (data) {
            return;
        }

        getData();
    }, [data])

    const childToParent = (click: boolean) => {
        navigation.navigate('Lançamentos');
    }

    const renderItem = ({ item }: ListRenderItemInfo<IDataLista>) => {

        return (
            <TableRow>
                <FirstColumn>
                    <TextInfo>{item.titulo}</TextInfo>
                </FirstColumn>
                <SecondColumn>
                <TextInfo style={{color:  item.autorizado === false && item.autorizadoEm !== null ? theme.colors.attention :
                        item.autorizado === false && item.autorizadoEm === null ? theme.colors.secondary : theme.colors.success
                    }}>
                    {
                        item.autorizado === false && item.autorizadoEm !== null ? 'Não autorizado' :
                        item.autorizado === false && item.autorizadoEm === null ? 'Em análise' : 'Finalizado'
                    }
                </TextInfo>
                </SecondColumn>
            </TableRow>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Solicitações" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                <TableHeader>
                    <ViewInfo>
                        <TextInfo>Curso</TextInfo>
                    </ViewInfo>
                    <ViewInfo>
                        <TextInfo>Situação</TextInfo>
                    </ViewInfo>
                </TableHeader>
                {
                    data === undefined ? (
                        <ContentView>
                            <Loading />
                        </ContentView>
                    ) : (
                        <ContentView>
                            {
                                data &&
                                <FlatList
                                    keyExtractor={(item) => String(item.codigo)}
                                    data={data}
                                    extraData={data}
                                    renderItem={renderItem}
                                    initialNumToRender={10}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    ListFooterComponent={<Loading isLoading={hasMoreData} />}
                                    onEndReached={getData}
                                    onEndReachedThreshold={0.1}
                                    scrollsToTop={false}
                                />
                            }
                        </ContentView>
                    )
                }
            </Container>
        </SafeAreaView>
    )
}
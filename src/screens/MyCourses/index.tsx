import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Container, ContentView } from "./styles";
import { FlatList, ListRenderItemInfo, SafeAreaView, StatusBar } from "react-native";

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { CardMyCourses } from "../../components/CardMyCourses";
import { Loading } from "../../components/Loading";


import theme from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { useAuth } from "../../contexts/AuthProvider";
import { IData, useCourseHome } from "../../contexts/CourseProvider";

const MemoizedCardMyCourses = memo(CardMyCourses);

export function MyCourses() {
    const navigation = useNavigation();
    const { auth } = useAuth();
    const { data, getData } = useCourseHome();

    // Chama getData apenas se o token mudar
    useEffect(() => {
        if (auth?.data.token) {
            getData(auth.data.token);
        }

    }, [auth?.data.token, getData])

    const childToParent = useCallback(() => {
        navigation.navigate('Lançamentos');
    }, [navigation]);

    // Memoização dos dados filtrados e ordenados
    const filteredData = useMemo(() => {
        if (data?.data) {
            return data.data
                .filter((item) => item.matriculado === true)
                .sort((a, b) => a.matriculadoEm < b.matriculadoEm ? 1 : a.matriculadoEm > b.matriculadoEm ? -1 : 0);
        }
        return [];
    }, [data?.data]);

    // Memoização da keyExtractor
    const keyExtractor = useCallback((item: IData) => item.titulo, []);

    // Função renderItem memoizada
    const renderItem = useCallback(({ item }: ListRenderItemInfo<IData>) => {

        return (
            <MemoizedCardMyCourses
                image={`BASE_URL/EAD/FilesDB/${item.imagem}`}
                title={item.titulo}
                data={moment(item.matriculadoEm).format('DD/MM/YYYY')}
                time={item.diasDisponivel}
                category={item.categoria}
                colorCategory={item.categoriaCor}
                clickButton={() => navigation.navigate('ContentCourse', {
                    titulo: item.titulo,
                    descricao: item.descricao.replace(/<[^>]+>/g, ""),
                    categoria: item.categoria,
                    cargaHoraria: item.cargaHoraria,
                    aprovadoEm: item.aprovadoEm,
                    codigo: item.codigo,
                    professor: item.professor
                })}
            />
        )
    }, [navigation])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Meus Cursos" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                {
                    data?.data === undefined ? (
                        <ContentView>
                            <Loading />
                        </ContentView>
                    ) : (
                        <ContentView>
                            {
                                data.data &&
                                <FlatList
                                    keyExtractor={keyExtractor}
                                    data={filteredData}
                                    renderItem={renderItem}
                                    initialNumToRender={10}
                                    contentContainerStyle={{ paddingBottom: 30 }}
                                />
                            }
                        </ContentView>
                    )
                }
            </Container>
        </SafeAreaView>
    )
}
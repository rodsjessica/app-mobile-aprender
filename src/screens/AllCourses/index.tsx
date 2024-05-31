import React, { useEffect, useState, memo, useCallback } from "react";
import { SafeAreaView, StatusBar, FlatList, ListRenderItemInfo } from "react-native";

import {
    Container,
    ContentView,
    ContentSelect,
} from "./styles";

import theme from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list';

import { useAuth } from "../../contexts/AuthProvider";
import { IData, useCourseHome } from "../../contexts/CourseProvider";

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { Loading } from "../../components/Loading";
import { CardCourses } from "../../components/CardCourses";

const MemoizedCardCourses = memo(CardCourses);

export function AllCourses() {
    const { auth} = useAuth();
    const { data, getData } = useCourseHome();
    const navigation = useNavigation();
    const [selected, setSelected] = useState('');

    useEffect(() => {
        getData(auth?.data.token);

    }, [])

    //================== filtro de categorias =====================
    const filter = (value : any, index : any, array: any) => {
        return array.findIndex((x : any) => x.codCategoria === value.codCategoria) === index;
    }

    const categories: any = data?.data
    .map(({codCategoria, categoria}) => ({codCategoria, categoria}))
    .filter(filter)
    .map((obj : any) => ({key: obj.codCategoria.toString(), value: obj.categoria}));

    //===============================================================

    const childToParent = (click: boolean) => {
        navigation.navigate('Lançamentos');
    }

    const renderItem = useCallback(({ item }: ListRenderItemInfo<IData>) => {
        const shouldHide = selected !== '' && selected !== item.codCategoria.toString();

        if (shouldHide) return null;

        return (
            <MemoizedCardCourses
                course={item.titulo}
                infoCourse={item.descricao.replace(/<[^>]+>/g, "")}
                image={`BASE_URL/EAD/FilesDB/${item.imagem}`}
                category={item.categoria}
                codCategory={item.codCategoria}
                colorCategory={item.categoriaCor}
                time={item.cargaHoraria}
                iconName="clock-outline"
                clickButton={() =>
                    navigation.navigate('NewSolicitation', {
                        titulo: item.titulo,
                        descricao: item.descricao.replace(/<[^>]+>/g, ""),
                        categoria: item.categoria,
                        cargaHoraria: item.cargaHoraria,
                        aprovadoEm: item.aprovadoEm,
                        codigo: item.codigo,
                        professor: item.professor
                    })
                }
            />
        );
    }, [selected, navigation]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Todos os Cursos" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                <ContentSelect>
                    <SelectList
                        setSelected={(key: any) => {
                            setSelected(key)
                        }}
                        data={categories}
                        save="key"
                        onSelect={() => selected}
                        placeholder="Selecione por categoria"
                        search={false}
                        inputStyles={{ fontSize: 16, color: theme.colors.dark }}
                        dropdownStyles={{ borderColor: theme.colors.third, borderWidth: 1.5, backgroundColor: theme.colors.background }}
                        dropdownTextStyles={{ fontSize: 16, color: theme.colors.dark }}
                        boxStyles={{ borderColor: theme.colors.third, borderWidth: 1.5, backgroundColor: theme.colors.background }}
                    />
                </ContentSelect>
                {
                    data?.data === undefined ?
                        (
                            <ContentView>
                                <Loading />
                            </ContentView>
                        ) : (
                            <ContentView>
                                {
                                    data?.data &&
                                    <FlatList
                                        extraData={selected}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={data?.data.filter(item => item.matriculado !== true).filter(item => selected === '' || item.codCategoria.toString() === selected)}
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
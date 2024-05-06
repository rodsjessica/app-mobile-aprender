import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList, ListRenderItemInfo } from "react-native";

import {
    Container,
    ContentView,
    ContentSelect,
} from "./styles";

import theme from "../../global/styles/theme";
import { IData, useCourseHome } from "../../contexts/CourseProvider";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list';

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { Loading } from "../../components/Loading";
import { CardCourses } from "../../components/CardCourses";

export function AllCourses() {
    const { data } = useCourseHome();
    const navigation = useNavigation();
    const [selected, setSelected] = useState('');

    //================== filtro de categorias =====================
    const filter = (value : any, index : any, array: any) => {
        return array.findIndex((x : any) => x.codCategoria === value.codCategoria) === index;
    }

    const categories: any = data?.data.map(({codCategoria, categoria}) => ({codCategoria, categoria})).filter(filter).map((obj : any) => ({key: obj.codCategoria.toString(), value: obj.categoria}));

    //===============================================================

    const childToParent = (click: boolean) => {
        navigation.navigate('Lançamentos');
    }

    const renderItem = ({ item }: ListRenderItemInfo<IData>) => {

        return (
            selected !== '' && selected !== item.codCategoria.toString() ? (
                <CardCourses
                    course={item.titulo}
                    infoCourse={item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", "")}
                    image={`BASE_URL/EAD/FilesDB/${item.imagem}`}
                    category={item.categoria}
                    codCategory={item.codCategoria}
                    colorCategory={item.categoriaCor}
                    time={item.cargaHoraria}
                    iconName="clock-outline"
                    clickButton={ () =>
                        item.matriculado !== false ?
                        navigation.navigate('ContentCourse', {
                            titulo: item.titulo,
                            descricao: item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", ""),
                            categoria: item.categoria,
                            cargaHoraria: item.cargaHoraria,
                            aprovadoEm: item.aprovadoEm,
                            codigo: item.codigo,
                            professor: item.professor
                        })
                        :
                        navigation.navigate('NewSolicitation', {
                            titulo: item.titulo,
                            descricao: item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", ""),
                            categoria: item.categoria,
                            cargaHoraria: item.cargaHoraria,
                            aprovadoEm: item.aprovadoEm,
                            codigo: item.codigo,
                            professor: item.professor
                        })
                    }
                    hidden
                />
            ) : (
                <CardCourses
                    course={item.titulo}
                    infoCourse={item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", "")}
                    image={`BASE_URL/EAD/FilesDB/${item.imagem}`}
                    category={item.categoria}
                    codCategory={item.codCategoria}
                    colorCategory={item.categoriaCor}
                    time={item.cargaHoraria}
                    iconName="clock-outline"
                    clickButton={ () =>
                        item.matriculado !== false ?
                        navigation.navigate('ContentCourse', {
                            titulo: item.titulo,
                            descricao: item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", ""),
                            categoria: item.categoria,
                            cargaHoraria: item.cargaHoraria,
                            aprovadoEm: item.aprovadoEm,
                            codigo: item.codigo,
                            professor: item.professor
                        })
                        :
                        navigation.navigate('NewSolicitation', {
                            titulo: item.titulo,
                            descricao: item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", ""),
                            categoria: item.categoria,
                            cargaHoraria: item.cargaHoraria,
                            aprovadoEm: item.aprovadoEm,
                            codigo: item.codigo,
                            professor: item.professor
                        })
                    }
                />
            )
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Todos os Cursos" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                <ContentSelect>
                    <SelectList
                        setSelected={(key: any) => setSelected(key)}
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
                                        extraData={data.data}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={data?.data}
                                        renderItem={renderItem}
                                        initialNumToRender={200}
                                        contentContainerStyle={{ paddingBottom: 50 }}
                                    />
                                }
                            </ContentView>
                        )

                }
            </Container>
        </SafeAreaView>
    )

}
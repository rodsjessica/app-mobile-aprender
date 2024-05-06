import React from "react";
import { Container, ContentView } from "./styles";
import { FlatList, ListRenderItemInfo, SafeAreaView, StatusBar } from "react-native";

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { CardMyCourses } from "../../components/CardMyCourses";
import { Loading } from "../../components/Loading";

import { IData, useCourseHome } from "../../contexts/CourseProvider";
import theme from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";


export function MyCourses() {
    const navigation = useNavigation();
    const { data } = useCourseHome();

    const childToParent = (click: boolean) => {
        navigation.navigate('Lançamentos');
    }

    const renderItem = ({ item }: ListRenderItemInfo<IData>) => {
        
        return (
            <CardMyCourses
                image={`https://www.universidadefenabrave.com.br/EAD/FilesDB/${item.imagem}`}
                title={item.titulo}
                data={moment(item.matriculadoEm).format('DD/MM/YYYY')}
                time={item.diasDisponivel}
                category={item.categoria}
                colorCategory={item.categoriaCor}
                clickButton={() => navigation.navigate('ContentCourse', {
                    titulo: item.titulo,
                    descricao: item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", ""),
                    categoria: item.categoria,
                    cargaHoraria: item.cargaHoraria,
                    aprovadoEm: item.aprovadoEm,
                    codigo: item.codigo,
                    professor: item.professor
                })}
            />
        )
    }

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
                                    keyExtractor={item => item.titulo}
                                    data={data.data.filter((item) => item.matriculado === true).sort((a,b) => a.matriculadoEm < b.matriculadoEm ? 1 : a.matriculadoEm > b.matriculadoEm? -1 : 0)}
                                    renderItem={renderItem}
                                    initialNumToRender={1000}
                                />
                            }
                        </ContentView>
                    )
                }
            </Container>
        </SafeAreaView>
    )
}
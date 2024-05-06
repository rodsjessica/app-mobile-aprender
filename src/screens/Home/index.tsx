import React, { useEffect, useState } from "react";

import {
    Container,
    ContentView
} from './styles';

import { useNavigation } from "@react-navigation/native";
import { FlatList, ListRenderItemInfo, SafeAreaView, StatusBar } from "react-native";

import theme from "../../global/styles/theme";
import { useAuth } from "../../contexts/AuthProvider";
import { IData, useCourseHome } from "../../contexts/CourseProvider";

import { Header } from "../../components/Header";
import { ModalMenu } from "../../components/Modal";
import { InfoTitle } from "../../components/InfoTitle";
import { CardCourses } from "../../components/CardCourses";
import { Loading } from "../../components/Loading";

export function Home() {
    const { auth } = useAuth();
    const { getData, data } = useCourseHome();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const letter = auth?.data.nome.substring(0, 1);

    useEffect(() => {
        getData(auth?.data.token);

    }, [])

    //função para trazer o click do botão no componente Header
    const childToParent = (click: boolean) => {
        if (click === true) {
            setModalVisible(true)
        }
    }
    // =====================================

    // função para fechar o Modal do Menu
    const touchToClose = (click: boolean) => {
        setModalVisible(false)
    }
    // =====================================

    const handleShowProfile = (click: boolean) => {
        navigation.navigate('Profile')
        setModalVisible(false)
    }

    const handleShowSolicitation = (click: boolean) => {
        navigation.navigate('Solicitation')
        setModalVisible(false)
    }

    const renderItem = ({ item }: ListRenderItemInfo<IData>) => {

        return (
            <CardCourses
                course={item.titulo}
                infoCourse={item.descricao.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<b>", "").replaceAll("</b>", "").replace("<i>", "").replace("</i>", "").replace("<div>", "").replace("</div>", "")}
                image={`BASE_URL/EAD/FilesDB/${item.imagem}`}
                category={item.categoria}
                colorCategory={item.categoriaCor}
                time={item.cargaHoraria}
                iconName="clock-outline"
                info="Lançamento"
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
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <Container>
                {
                    modalVisible &&
                    <ModalMenu
                        iconName={'close-box'}
                        visible={modalVisible}
                        touchToClose={touchToClose}
                        name={auth?.data.nome}
                        email={auth?.data.email}
                        handleShowProfile={handleShowProfile}
                        handleShowSolicitation={handleShowSolicitation}
                        letter={letter}
                    />
                }
                <Header iconName={'menu'} childToParent={childToParent} />
                <InfoTitle name="arrow-right" title="Lançamentos" />
                {
                    data === undefined ?
                        (
                            <ContentView>
                                <Loading />
                            </ContentView>
                        ) : (
                            <ContentView>
                                {
                                    data?.data &&
                                    <FlatList
                                        keyExtractor={item => item.titulo}
                                        data={data?.data.filter((item) => item.ativo === true).sort((a, b) => a.atualizadoEm < b.atualizadoEm ? 1 : a.atualizadoEm > b.atualizadoEm ? -1 : 0).slice(0, 5)}
                                        renderItem={renderItem}
                                    />
                                }
                            </ContentView>
                        )

                }
            </Container>
        </SafeAreaView>
    )
}
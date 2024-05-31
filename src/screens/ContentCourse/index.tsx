import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, StatusBar, PermissionsAndroid, Platform, Linking } from "react-native";

import {
    Container,
    ContentButton,
    Title,
    ContentTitle,
    ContentDesc,
    Description,
    ContentView,
    ContentViewVideo,
    ContentViewInfo,
    ContentImage,
    IconImage,
    ContentVideoTitle,
    ContentCourseRecommended
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import RNFetchBlob from "rn-fetch-blob";

import theme from "../../global/styles/theme";
import { downloadCertificateService } from "../../services/downloadCertificateService";
import { contentsService } from "../../services/contentsService";
import { attemptsMadeService } from "../../services/attemptsMadeService";
import { urlFilesDB } from "../../services/filesDB";

import { useAuth } from "../../contexts/AuthProvider";
import { useCourseHome } from "../../contexts/CourseProvider";

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { CardInfoCourse } from "../../components/CardInfoCourse";
import { SeparatorTag } from "../../components/SeparatorTag";
import { Button } from "../../components/Button";
import { CardContentCourse } from "../../components/CardContentCourse";
import { Loading } from "../../components/Loading";
import { ModalEvaluation } from "../../components/ModalEvaluation";
import { PodCast } from "../../components/Podcast";
import { Video } from "../../components/Video";
import { CardCourses } from "../../components/CardCourses";


export interface IProps {
    statusCode: string;
    message: string;
    data: string;
}

export interface IAttemptsMade {
    tentativasRealizadas: any;
}
export interface IPropsAttemptsMade {
    statusCode: number;
    message: string;
    data?: IAttemptsMade;
}

export interface IPropsDataContents {
    ativo: boolean;
    atualizadoEm: any;
    atualizadoPor: any;
    codCurso: number;
    codigo: number;
    conteudo: string;
    criadoEm: string;
    criadoPor: number;
    descricao: any;
    tipo: string;
    titulo: string;
}

export interface IDataContents {
    data?: IPropsDataContents[];
    message: string;
    statusCode: number;
}

export function ContentCourse({ route }: any) {
    const { auth } = useAuth();
    const { data } = useCourseHome();
    const navigation = useNavigation();

    const [certificate, setCertificate] = useState<IProps>();
    const [dataContents, setDataContents] = useState<IDataContents>();
    const [dataAttemptsMade, setDataAttemptsMade] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const token: any = auth?.data.token;

    const courseRecommended: any = data?.data.filter((item) =>
        !item.matriculado && (item.categoria === route.params?.categoria || item.categoria === 'Todos')
    ).sort(() => Math.random() - 0.5).slice(0, 3);

    const handoutFilter = dataContents?.data?.filter(item => item.tipo === "APOSTILA");
    const videoFilter = dataContents?.data?.filter(item => item.tipo === "VIDEO");
    const podCastFilter = dataContents?.data?.filter(item => item.tipo === "PODCAST");
    const multimediaFilter = dataContents?.data?.filter(item => item.tipo === "MULTIMIDIA");
    const evaluationFilter = dataContents?.data?.filter(item => item.tipo === "AVALIACAO");

    const childToParent = (click: boolean) => {
        navigation.navigate('MyCourses');
    }

    //================================ Requisições API ===================================

    const getCertificate = useCallback(async () => {
        try {
            const resp = await downloadCertificateService.getDataCertificate(token, route.params?.codigo);
            setCertificate(resp);

        } catch (error) {
            console.error('Erro ao buscar certificado:', error);
        }
    }, [token, route.params?.codigo]);


    const getContentCourse = useCallback(async () => {
        try {
            const resp = await contentsService.getContents(route.params?.codigo, token);
            setDataContents(resp);

        } catch (error) {
            console.error('Erro ao buscar conteúdo do curso:', error);
        }
    }, [token, route.params?.codigo]);


    const getAttemptsMade = useCallback(async () => {
        try {
            const resp = await attemptsMadeService.getAttemptsMade(token, route.params?.codigo);
            setDataAttemptsMade(resp.data?.tentativasRealizadas);

        } catch (error) {
            console.error('Erro ao buscar tentativas realizadas:', error);
        }
    }, [token, route.params?.codigo]);


    //====================================================================================

    useFocusEffect(
        useCallback(() => {

            getCertificate();
            getContentCourse();
            getAttemptsMade();

        }, [getCertificate, getContentCourse, getAttemptsMade])
    );

    //função para pedir permissão para Android e ios
    const requestStoragePermission = async () => {

        if (Platform.OS === "android" && Number(Platform.Version) <= 29) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );

            granted === PermissionsAndroid.RESULTS.GRANTED ? downloadPDF() : console.log("Permissão negada");

        } else {
            downloadPDF();
        }

        if (Platform.OS === 'ios') {
            downloadPDF();
        }

    }

    const downloadPDF = () => {

        const { dirs } = RNFetchBlob.fs;
        const data: any = certificate?.data;
        const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

        const configfb = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `certificado.pdf`,
                path: `${dirToSave}/certificado.pdf`,
            },
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: 'certificado.pdf',
            path: `${dirToSave}/certificado.pdf`,
        };

        const configOptions = Platform.select({
            ios: configfb,
            android: configfb,
        });

        RNFetchBlob.config(configOptions || {});

        RNFetchBlob.fs.writeFile(configfb.path, data, 'base64')
            .then(() => {

                return showMessage({
                    message: "PDF salvo com sucesso!",
                    type: "success",
                });
            })
            .catch(() => {

                return showMessage({
                    message: "Erro ao salvar pdf",
                    type: "danger",
                });
            })

        if (Platform.OS === 'ios') {
            RNFetchBlob.ios.previewDocument(configfb.path);
        }

    }

    const handleHandout = async () => {
        const apostila = handoutFilter?.map(item => item.conteudo);

        const url = `${urlFilesDB}/${String(apostila)}.pdf`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error('Não é possível abrir o link:', url);
        }
    };

    const handleMultimedia = async () => {
        const multimidia = multimediaFilter?.map(item => item.conteudo);

        const url = `${urlFilesDB}/${String(multimidia)}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error('Não é possível abrir o link:', url);
        }
    }

    const handleEvaluation = () => {
        setModalVisible(true)

    }

    const touchToClose = (click: boolean) => {
        setModalVisible(false)
    }

    const clickButton = () => {
        setModalVisible(false);
        navigation.navigate('Evaluation', {
            titulo: route.params?.titulo,
            codigo: route.params?.codigo
        });

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Conteúdo" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                <CardInfoCourse
                    title={route.params?.titulo}
                    description={route.params?.descricao}
                    category={route.params?.categoria}
                    time={route.params?.cargaHoraria}
                    teacher={route.params?.professor}
                />
                {
                    route.params?.aprovadoEm !== null &&
                    <ContentButton>
                        <Button title="Certificado" onPress={() => requestStoragePermission()} width={200} color={theme.colors.success} />
                    </ContentButton>
                }
                <SeparatorTag info="Conteúdo" />
                <ContentTitle>
                    <Title>Estude no seu ritmo: LEIA, ASSISTA, OUÇA</Title>
                </ContentTitle>
                <ContentDesc>
                    <Description>
                        O curso, totalmente online, atende a todos os
                        perfis de alunos, que podem estudar no seu
                        ritmo e do seu jeito, acessando o conteúdo a
                        qualquer hora do dia, em qualquer lugar.
                        {"\n"}
                        {"\n"}
                        Aqui você encontra todo o material
                        pedagógico nos diferentes canais disponíveis:
                        apostila escrita, vídeos e podcast. Por serem
                        independentes, cada um deles aborda
                        integralmente os temas de estudo; assim
                        você pode acessar só a apostila, só os vídeos
                        ou só o podcast, na ordem em que preferir,
                        preparando-se com sucesso para a avaliação final.
                        E você pode, claro, acessar todos eles para fixar
                        ainda mais os assuntos abordados.
                        {"\n"}
                        {"\n"}
                        O curso também está disponível no aplicativo
                        da Universidade Web Fenabrave: tudo na
                        palma da mão.
                        {"\n"}
                        {"\n"}
                        Bom estudo!
                        {"\n"}
                    </Description>
                </ContentDesc>
                {
                    dataContents === undefined ?
                        (
                            <ContentView>
                                <Loading />
                            </ContentView>
                        ) : (
                            <>
                                {
                                    //componente replicado para atender solicitação do cliente
                                    handoutFilter &&
                                    handoutFilter.map((item) => (
                                        <CardContentCourse
                                            key={item.tipo}
                                            title={"E-book"}
                                            path={require('../../assets/images/ebook.png')}
                                            widthIcon={38}
                                            heightIcon={50}
                                            info={"Resumo:"}
                                            infoDesc={item.descricao}
                                            titleBtn={"Apostila"}
                                            widthBtn={200}
                                            colorBtn={theme.colors.success}
                                            clickButton={handleHandout}
                                        />
                                    ))
                                }
                                <ContentViewVideo>
                                    <ContentViewInfo>
                                        <ContentImage>
                                            <IconImage source={require('../../assets/images/video.png')} />
                                        </ContentImage>
                                        <ContentVideoTitle>
                                            <Title>Vídeos</Title>
                                        </ContentVideoTitle>
                                    </ContentViewInfo>
                                    {
                                        videoFilter &&
                                        videoFilter.map((item, index) => (
                                            <Video
                                                key={index}
                                                titleCourse={item.titulo}
                                                contentVideo={item.conteudo}
                                            />
                                        ))
                                    }
                                </ContentViewVideo>
                                {
                                    podCastFilter &&
                                    podCastFilter.map((item) => (
                                        <PodCast
                                            key={item.titulo}
                                            titleCourse={item.titulo}
                                            contentPodcast={item.conteudo}
                                        />
                                    ))
                                }
                                {
                                    modalVisible &&
                                    <ModalEvaluation
                                        visible={modalVisible}
                                        attempts={dataAttemptsMade}
                                        attemptsMade={String(dataAttemptsMade)}
                                        touchToClose={touchToClose}
                                        clickButton={clickButton}
                                    />
                                }
                                {
                                    //componente replicado para atender solicitação do cliente
                                    multimediaFilter &&
                                    multimediaFilter.map((item) => (
                                        <CardContentCourse
                                            key={item.tipo}
                                            title={"Multimídia"}
                                            path={require('../../assets/images/multimidia.png')}
                                            widthIcon={40}
                                            heightIcon={40}
                                            info={"Resumo:"}
                                            infoDesc={item.descricao}
                                            titleBtn={"Conteúdo"}
                                            widthBtn={200}
                                            colorBtn={theme.colors.success}
                                            clickButton={handleMultimedia}
                                        />
                                    ))
                                }
                                {
                                    //componente replicado para atender solicitação do cliente
                                    evaluationFilter &&
                                    evaluationFilter.map((item) => (
                                        <CardContentCourse
                                            key={item.tipo}
                                            title={"Avaliação Final"}
                                            path={require('../../assets/images/avaliacaofinal.png')}
                                            widthIcon={42}
                                            heightIcon={40}
                                            info={"Orientações:"}
                                            infoDesc={item.descricao}
                                            titleBtn={"Avaliação"}
                                            widthBtn={200}
                                            colorBtn={theme.colors.attention}
                                            clickButton={handleEvaluation}
                                        />
                                    ))
                                }

                            </>
                        )
                }
                <SeparatorTag info="Cursos Recomendados" />
                <ContentCourseRecommended>
                    {
                        data === undefined ? (
                            <ContentView>
                                <Loading />
                            </ContentView>
                        ) : (
                            courseRecommended?.map((item: any) => (

                                <CardCourses
                                    key={item.titulo}
                                    course={item.titulo}
                                    infoCourse={item.descricao.replace(/<[^>]+>/g, "")}
                                    image={`BASE_URL/EAD/FilesDB/${item.imagem}`}
                                    category={item.categoria}
                                    colorCategory={item.categoriaCor}
                                    time={item.cargaHoraria}
                                    iconName="clock-outline"
                                    info="Lançamento"
                                    clickButton={() =>
                                        item.matriculado !== false ?
                                            navigation.navigate('ContentCourse', {
                                                titulo: item.titulo,
                                                descricao: item.descricao.replace(/<[^>]+>/g, ""),
                                                categoria: item.categoria,
                                                cargaHoraria: item.cargaHoraria,
                                                aprovadoEm: item.aprovadoEm,
                                                codigo: item.codigo,
                                                professor: item.professor
                                            })
                                            :
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

                            ))
                        )
                    }
                </ContentCourseRecommended>

            </Container>
            <FlashMessage position="center" />
        </SafeAreaView>
    )

}
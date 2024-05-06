import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import {
    Container,
    Content,
    ContentScrollView,
    HeaderProfile,
    ContentViewLetter,
    ContentViewInfo,
    ContentLetter,
    ContentName,
    ContentEmail,
    ContentInfo,
    ContentData,
    ContentLevelEducation,
    ContentSelectList,
    LabelText,
    ContentViewButton,
    ContentViewButtonUnderlined,
    ContentView
} from "./styles";

import axios from "axios";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { SelectList } from 'react-native-dropdown-select-list';
import Collapsible from 'react-native-collapsible';

import theme from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthProvider";
import { authRecoverStudentService } from "../../services/authRecoverStudentService";
import { returnCompanyService } from "../../services/returnCompanyService";
import { changePasswordService } from "../../services/changePasswordService";
import { updateStudentService } from "../../services/updateStudentService";

import { HeaderNavigation } from "../../components/HeaderNavigation";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Button";
import { ModalAlert } from "../../components/ModalAlert";
import { ButtonUnderlined } from "../../components/ButtonUnderlined";
import moment from "moment";
import { Loading } from "../../components/Loading";
import { SeparatorTag } from "../../components/SeparatorTag";

import { dataLevelEducation } from "../../global/constants/dataLevelEducation";
import { dataGender } from "../../global/constants/dataGender";
import { dataOffice } from "../../global/constants/dataOffice";
import { dataDepartment } from "../../global/constants/dataDepartment";


export interface IUpdateStudent {
    statusCode: number;
    message: string;
    data: string;
}
export interface IChangePassword {
    statusCode: number;
    message: string;
}

export interface IDataReturnCompany {
    nro_CGC: string;
    des_Razao_Social: string;
}
export interface IReturnCompany {
    statusCode: number;
    message: string;
    data: IDataReturnCompany;
}
export interface IData {
    ativo: boolean;
    cargo: string;
    celular: string;
    codEscolaridade: number;
    codMaster: number;
    codigo: number;
    cpf: string;
    criadoEm: string;
    criadoPor: number;
    ddd: string;
    departamento: string;
    email: string;
    imagem: any;
    nascimento: string;
    nome: string;
    politicaSenha: boolean;
    rg: string;
    senha: string;
    sexo: string;
    usuario: string;
}
export interface IProps {
    data?: IData;
    message: string;
    statusCode: string;
}

export function Profile() {
    const { auth } = useAuth();
    const navigation = useNavigation();
    const [data, setData] = useState<IData>();

    const [company, setCompany] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [selectedLevelEducation, setSelectedLevelEducation] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [officeSelected, setOfficeSelected] = useState('');
    const [departmentSelected, setDepartmentSelected] = useState();

    const [ddd, setDDD] = useState<any>();
    const [cellPhone, setCellPhone] = useState<any>();
    const [infoOffice, setInfoOffice] = useState<any>();
    const [infoDepartment, setInfoDepartment] = useState<any>();

    const [modalVisible, setModalVisible] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [levelEducation, setLevelEducation] = useState('');

    const letter = data?.nome.substring(0, 1);
    const token: any = auth?.data.token;

    async function getData() {
        const resp = await authRecoverStudentService.getRecoverStudent(token);

        setData(resp.data)
        setDDD(resp.data?.ddd)
        setCellPhone(resp.data?.celular)
        setInfoOffice(resp.data?.cargo)
        setInfoDepartment(resp.data?.departamento)

        return resp.data;
    }

    async function getCompany() {
        const resp = await returnCompanyService.getReturnCompany(token)

        if (resp.message === 'Sucesso na requisição') {
            setCompany(resp.data.des_Razao_Social)
        }
    }

    async function changePassword() {

        if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
            return showMessage({
                message: "Por favor, preencha o campo vazio.",
                type: "danger",
            });
        }

        if (currentPassword !== data?.senha) {
            return showMessage({
                message: "Verifique se a senha atual é a correta!",
                type: "danger",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return showMessage({
                message: "Campos 'Nova senha' e 'Confirmar Nova Senha' não coincidem.",
                type: "danger",
            });
        }

        if (newPassword.length < 3 || confirmNewPassword.length < 3) {
            return showMessage({
                message: "A senha precisa de pelo menos 3 caracteres.",
                type: "danger",
            });
        }

        const resp = await changePasswordService.postChangePassword(token, newPassword)

        setModalVisible(true)
    }

    async function postUpdateRegister() {

        if(infoOffice === ""){
            
            return showMessage({
                message: "Por favor, preencha o campo vazio.",
                type: "danger",
            });
        }

        if(infoDepartment === ""){
            
            return showMessage({
                message: "Por favor, preencha o campo vazio.",
                type: "danger",
            });
        }

        const body = {
            "token": auth?.data.token,
            "sexo": selectedGender,
            "ddd": ddd,
            "numeroCelular": cellPhone,
            "escolaridade": Number(selectedLevelEducation),
            "cargo": infoOffice,
            "departamento": infoDepartment
        } 
        
        const resp = await updateStudentService.postUpdateStudent(body)

        setModalVisible(true)
    }

    useEffect(() => {
        if (data) return;

        getData();
        getCompany();
    }, [data])

    //==================================================================================

    const touchToClose = () => {
        setModalVisible(false)
    }

    const childToParent = (click: boolean) => {
        navigation.navigate('Home');
    }

    const handleVisibleInfo = (key: any) => {
        console.log('cliquei')
    }

    const handleCollapsible = () => {
        setCollapsed(!collapsed)
    }

    //========================== functions dropdown select ===================================

    const selectedOffice = (key : any) => {

        if(key === "Outros"){
            setInfoOffice("")
        } else {
            setInfoOffice(key)
        }
        setOfficeSelected(key)
    }

    const selectedDepartment = (key: any) => {
        if(key === "Outros"){
            setInfoDepartment("")
        } else {
            setInfoDepartment(key)
        }
  
        setDepartmentSelected(key)
    }

    //================== lógica para setar o valor default do select list ===========

    const valueLevelEducation: any = dataLevelEducation.find((element) => {
        if (element.key === String(data?.codEscolaridade)) {
            return element.value;
        }
    })

    const valueOffice = dataOffice.find((element) => {
        if (element.value !== data?.cargo) {
            return element.value === 'Outros';
        } else {
            return element.value;
        }
    })

    const valueGender: any = dataGender.find((element) => {
        if (element.value === "Feminino" && data?.sexo === "F") {
            return element.value;
        }

        if (element.value === "Masculino" && data?.sexo === "M") {
            return element.value;
        }

        if (element.value === "Não quero informar" && data?.sexo === "N") {
            return element.value;
        }
    })

    const valueDepartment = dataDepartment.find((element) => {
        if (element.value !== data?.departamento) {
            return element.value === 'Outros';
        } else {
            return element.value;
        }
    })

    //==================================================================================

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.primary} />
            <HeaderNavigation title="Perfil" iconName="arrow-left" childToParent={childToParent} />
            <Container>
                {
                    modalVisible &&
                    <ModalAlert
                        info="Atualizado com sucesso."
                        visible={modalVisible}
                        touchToClose={touchToClose} />
                }
                <HeaderProfile>
                    <ContentViewLetter>
                        <ContentLetter>{letter}</ContentLetter>
                    </ContentViewLetter>
                    <ContentViewInfo>
                        <ContentName>{data?.nome}</ContentName>
                        <ContentEmail>{data?.email}</ContentEmail>
                        <ContentInfo>Aluno(a) desde: <ContentData>{moment(data?.criadoEm).format('DD/MM/YYYY')}</ContentData></ContentInfo>
                        <ContentLevelEducation>{
                            valueLevelEducation === undefined ? <ContentView><Loading /></ContentView> : valueLevelEducation.value
                        }</ContentLevelEducation>
                    </ContentViewInfo>
                </HeaderProfile>
                <ContentScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <SeparatorTag info="Informações Complementares" />
                    <Content>
                        <InputForm field="Empresa" editable={false} value={company} defaultValue={company}/>
                    </Content>
                    <Content>
                        <InputForm field="CPF" editable={false} value={data?.cpf} defaultValue={data?.cpf} />
                    </Content>
                    <Content>
                        <InputForm field="Data de Nascimento" editable={false} value={moment(data?.nascimento).format('DD/MM/YYYY')} defaultValue={moment(data?.nascimento).format('DD/MM/YYYY')} />
                    </Content>
                    <ContentSelectList>
                        <LabelText>Sexo:</LabelText>
                        <SelectList
                            setSelected={(key: any) => setSelectedGender(key)}
                            data={dataGender}
                            save="key"
                            onSelect={() => (selectedGender)}
                            placeholder="Selecione por categoria"
                            search={false}
                            inputStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            boxStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownTextStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            defaultOption={valueGender}
                        />
                    </ContentSelectList>
                    <Content>
                        <InputForm field="DDD" value={ddd} onChangeText={text => setDDD(text)} defaultValue={data?.ddd} />
                    </Content>
                    <Content>
                        <InputForm field="Celular" value={cellPhone} onChangeText={text => setCellPhone(text)} defaultValue={data?.celular} />
                    </Content>
                    <ContentSelectList>
                        <LabelText>Escolaridade:</LabelText>
                        <SelectList
                            setSelected={(key: any) => setSelectedLevelEducation(key)}
                            data={dataLevelEducation}
                            save="key"
                            onSelect={() => (selectedLevelEducation)}
                            placeholder="Selecione por categoria"
                            search={false}
                            inputStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            boxStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownTextStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            defaultOption={valueLevelEducation}
                        />
                    </ContentSelectList>
                    <Content>
                        <InputForm field="Data Cadastro" editable={false} value={moment(data?.criadoEm).format('DD/MM/YYYY')} />
                    </Content>
                    <ContentSelectList>
                        <LabelText>Cargo:</LabelText>
                        <SelectList
                            setSelected={(key: any) => selectedOffice(key)}
                            data={dataOffice}
                            save="key"
                            onSelect={() => (infoOffice)}
                            placeholder="Selecione por categoria"
                            search={false}
                            inputStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            boxStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownTextStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            defaultOption={valueOffice}
                        />
                    </ContentSelectList>
                    {
                        officeSelected === 'Outros' &&
                        <Content>
                            <InputForm field="Informe o Cargo:" value={infoOffice} onChangeText={text => setInfoOffice(text)} defaultValue={data?.cargo} />
                        </Content>
                    }
                    <ContentSelectList>
                        <LabelText>Departamento:</LabelText>
                        <SelectList
                            setSelected={(key: any) => selectedDepartment(key)}
                            data={dataDepartment}
                            save="key"
                            onSelect={() => (infoDepartment)}
                            placeholder="Selecione por categoria"
                            search={false}
                            inputStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            boxStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownStyles={{ borderColor: theme.colors.gray, backgroundColor: theme.colors.gray_light }}
                            dropdownTextStyles={{ fontSize: 16, color: theme.colors.gray_dark }}
                            defaultOption={valueDepartment}
                        />
                    </ContentSelectList>
                    {
                        departmentSelected === 'Outros' &&
                        <Content>
                            <InputForm field="Informe o Departamento:" value={infoDepartment} onChangeText={text => setInfoDepartment(text)} defaultValue={data?.departamento} />
                        </Content>
                    }
                    <ContentViewButton>
                        <Button
                            title='Atualizar cadastro'
                            color={theme.colors.attention}
                            width={250}
                            onPress={() => postUpdateRegister()}
                        />
                    </ContentViewButton>
                </ContentScrollView>
                <SeparatorTag info="Configurações básicas" />
                <ContentViewButtonUnderlined>
                    <ButtonUnderlined title="Alterar senha de acesso a plataforma" onPress={handleCollapsible} />
                </ContentViewButtonUnderlined>
                <Collapsible collapsed={collapsed} style={{ paddingBottom: 20 }}>
                    <Content>
                        <InputForm field="Senha Atual:" value={currentPassword} onChangeText={setCurrentPassword} autoCapitalize="none" />
                    </Content>
                    <Content>
                        <InputForm field="Nova Senha:" value={newPassword} onChangeText={setNewPassword} autoCapitalize="none" />
                    </Content>
                    <Content>
                        <InputForm field="Confirmar Nova Senha:" value={confirmNewPassword} onChangeText={setConfirmNewPassword} autoCapitalize="none" />
                    </Content>
                    <ContentViewButton>
                        <Button
                            title='Alterar Senha'
                            color={theme.colors.attention}
                            width={250}
                            onPress={() => changePassword()}
                        />
                    </ContentViewButton>
                </Collapsible>
            </Container>
            <FlashMessage position="center" />
        </SafeAreaView>
    )

}
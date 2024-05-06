import React, { createContext, useContext, useState } from "react";
import { CourseStudentService } from "../../services/courseStudentService";

export interface IDataLista {
    aprovadoEm: boolean;
    ativo: boolean;
    atualizadoEm: string;
    autor: any;
    banner: string;
    cargaHoraria: string;
    categoria: string;
    categoriaCor: string;
    codCategoria: number;
    codigo: number;
    criadoEm: string;
    criadoPor: number;
    cursoNovo: boolean;
    descricao: string;
    diasDisponivel: any;
    finalizadoEm: any;
    imagem: string;
    logo: string;
    matriculado: boolean;
    matriculadoEm: any;
    pais: any;
    rgb: string;
    thumbnail: string;
    titulo: string;
}
export interface IData {
    total_paginas: number;
    pagina: number;
    total_registros: number;
    lista: IDataLista;
}

export interface IProps {
    data?: IData;
    message: string;
    statusCode: string;
}

export interface IAllCoursesContext {
    getData: (token: any, page: number, limit: number) => Promise<IProps>;
    data?: IProps;
}

export interface IAllCoursesProvider {
    children: React.ReactNode;
}

export const AllCoursesContext = createContext<IAllCoursesContext>({} as IAllCoursesContext);

export const AllCoursesProvider: React.FC<IAllCoursesProvider> = ({ children }) => {
    // const [data, setData] = useState<IProps>();

    async function getData(token: any, page: number, limit: number): Promise <IProps> {

        const resp = await CourseStudentService.getCourseStudent(token, page, limit);

        // if(resp.message === 'Consulta realizada'){
        //     setData(resp);
        // }

        return resp;
    }


    return (
        <AllCoursesContext.Provider value={{ getData }}>
            {children}
        </AllCoursesContext.Provider>
    )
}

export function useAllCourses() {
    const context = useContext(AllCoursesContext);
    return context;

}
import React, { createContext, useContext, useEffect, useState } from "react";
import { courseHomeService } from "../../services/courseHomeService";

export interface IData {
  aprovadoEm: any;
  ativo: boolean;
  atualizadoEm: string;
  autor: any;
  banner: any;
  cargaHoraria: string;
  categoria: string;
  categoriaCor: string;
  codCategoria: number;
  codigo: number;
  criadoEm: string;
  criadoPor: string;
  cursoNovo: boolean;
  descricao: string;
  diasDisponivel: any;
  finalizadoEm: any;
  imagem: any;
  logo: any;
  matriculado: boolean;
  matriculadoEm: any;
  professor: string;
  pais: any;
  rgb: string;
  thumbnail: any;
  titulo: string;
}

export interface IDataCourseHome {
  data: IData[];
  message: string;
  statusCode: string;
}

export interface ICourseHomeContext {
  getData: (token: any) => Promise<IDataCourseHome>;
  data?: IDataCourseHome;
}

export interface ICourseHomeProvider {
  children: React.ReactNode;
}

export const CourseHomeContext = createContext<ICourseHomeContext>({} as ICourseHomeContext);

export const CourseHomeProvider: React.FC<ICourseHomeProvider> = ({ children }) => {
  const [data, setData] = useState<IDataCourseHome>();

  async function getData(token: string): Promise<IDataCourseHome> {

    const resp = await courseHomeService.getCourseHome(token);

    if (resp.message === "Sucesso na requisição") {
      setData(resp);
    }

    return resp;
  }


  return (
    <CourseHomeContext.Provider value={{ getData, data }}>
      {children}
    </CourseHomeContext.Provider>
  )
}

export function useCourseHome() {
  const context = useContext(CourseHomeContext);
  return context;

}
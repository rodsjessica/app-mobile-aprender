import React from "react";

import api from "./config/api";
import { IDataContents } from "../screens/ContentCourse";

async function getContents(codCourse : any, token: any) :Promise<IDataContents> {
  const response = await  api.get<IDataContents>(`Curso/conteudos?codCurso=${codCourse}&token=${token}`)
  .then(async (response) => {
    const resp = response.data

    return resp;
  })
  .catch((error) => {
    
    return error;
  })

  return response;

}

export const contentsService = {getContents}
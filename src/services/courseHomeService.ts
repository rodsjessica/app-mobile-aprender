import React from "react";

import api from "./config/api";
import { IDataCourseHome } from "../contexts/CourseProvider";

async function getCourseHome(token : any) :Promise<IDataCourseHome> {

  const response = await  api.get<IDataCourseHome>(`Curso/Home?token=${token}`)
  .then(async (response) => {
    const resp = response.data

    return resp;
  })
  .catch((error) => {
    
    return error;
  })

  return response;

}

export const courseHomeService = {getCourseHome}
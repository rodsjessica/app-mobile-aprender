import React from "react";

import api from "./config/api";
import { IProps } from "../contexts/AllCoursesProvider";

async function getCourseStudent(token: any, page: number, limit: number): Promise<IProps> {

    const response = api.get<IProps>(`Curso/cursosAluno?token=${token}&pagina=${page}&limite=${limit}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const courseStudentService = {getCourseStudent};
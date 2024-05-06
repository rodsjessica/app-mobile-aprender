import React from "react";

import api from "./config/api";
import { IUpdateStudent } from "../screens/Profile";

async function postUpdateStudent(data: any): Promise<IUpdateStudent> {

    const response = api.post<IUpdateStudent>(`Autenticacao/atualizarAluno`, data)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const updateStudentService = {postUpdateStudent};
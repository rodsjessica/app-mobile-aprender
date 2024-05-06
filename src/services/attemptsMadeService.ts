import React from "react";
import api from "./config/api";
import { IPropsAttemptsMade } from "../screens/ContentCourse";

async function getAttemptsMade (token: string, codCurso: any): Promise<IPropsAttemptsMade> {
    const response = api.get<IPropsAttemptsMade>(`Curso/tentativasAvaliacoes?token=${token}&codCurso=${codCurso}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const attemptsMadeService = {getAttemptsMade}
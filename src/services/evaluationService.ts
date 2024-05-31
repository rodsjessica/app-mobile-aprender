import React from "react";

import api from "./config/api";
import { IDataEvaluation } from "../screens/Evaluation";

async function getDataEvaluation(token: string, codCourse: string): Promise<IDataEvaluation> {

    const response = api.get<IDataEvaluation>(`ENDPOINTS?token=${token}&codCurso=${codCourse}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const evaluationService = {getDataEvaluation};
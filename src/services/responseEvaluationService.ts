import React from "react";

import api from "./config/api";
import { IDataResponseEvaluation } from "../screens/Evaluation";

async function postResponseEvaluation(respEvaluation: any): Promise<IDataResponseEvaluation> {

    const response = api.post<IDataResponseEvaluation>(`ENDPOINTS`,respEvaluation)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const responseEvaluationService = {postResponseEvaluation};
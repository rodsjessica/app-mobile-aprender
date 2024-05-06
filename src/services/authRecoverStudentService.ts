import React from "react";
import api from "./config/api";
import { IProps } from "../screens/Profile";

async function getRecoverStudent (token: string): Promise<IProps> {
    const response = api.post<IProps>(`ENDPOINTS?token=${token}`)
    .then(async (response) => {
        return response.data.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const authRecoverStudentService = {getRecoverStudent}
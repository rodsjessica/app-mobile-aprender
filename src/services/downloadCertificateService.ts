import React from "react";

import api from "./config/api";
import { IProps } from "../screens/ContentCourse";

async function getDataCertificate(token: string, codCourse: string): Promise<IProps> {

    const response = api.get<IProps>(`ENDPOINTS?token=${token}&codCurso=${codCourse}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const downloadCertificateService = {getDataCertificate};
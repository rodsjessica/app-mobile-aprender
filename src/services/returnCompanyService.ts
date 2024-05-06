import React from "react";

import api from "./config/api";
import { IReturnCompany } from "../screens/Profile";

async function getReturnCompany(token: string): Promise<IReturnCompany> {

    const response = api.post<IReturnCompany>(`ENDPOINTS?token=${token}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const returnCompanyService = {getReturnCompany};
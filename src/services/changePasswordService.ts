import React from "react";

import api from "./config/api";
import { IChangePassword } from "../screens/Profile";

async function postChangePassword(token: string, newPassword: string): Promise<IChangePassword> {

    const response = api.post<IChangePassword>(`ENDPOINTS?token=${token}&novaSenha=${newPassword}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
    
}

export const changePasswordService = {postChangePassword};
import React from "react";
import api from "./config/api";
import { IProps } from "../screens/Solicitation";

async function getSolicitation(token: string, page: number, limit: number): Promise<IProps>{

    const response = api.get<IProps>(`Solicitacao/SolicitacaoApp?token=${token}&pagina=${page}&limite=${limit}`)
    .then(async (response) => {
        return response.data;

    })
    .catch((error) => {
        return error;
        
    })

    return response;
}

export const solicitationService = {getSolicitation}
import React from "react";

import api from "./config/api";
import { IPropsNewSolicitation } from "../screens/NewSolicitation";

async function postNewSolicitation(data: any) :Promise<IPropsNewSolicitation> {
  const response = await  api.post<IPropsNewSolicitation>(`ENDPOINTS`, data)
  .then(async (response) => {
    const resp = response.data

    return resp;
  })
  .catch((error) => {
    
    return error;
  })

  return response;

}

export const newSolicitationService = {postNewSolicitation}
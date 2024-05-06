
import { IAuth } from "../contexts/AuthProvider";
import api from "./config/api";

async function getDataUser (username: string, password: string):Promise<IAuth>{

  const response = await api.post<IAuth>(
    'Autenticacao',
    {
      usuario: username,
      senha: password,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8", 
      }
    })
  .then(async (response) => {

    const resp = {
      data: {
        accessToken: response.data.data.accessToken,
        accessTokenExpires: response.data.data.accessTokenExpires,
        codAluno: response.data.data.codAluno,
        email: response.data.data.email,
        nome: response.data.data.nome,
        token: response.data.data.token,
        tokenExpires: response.data.data.tokenExpires,
      },
      message: response.data.message,
      statusCode: response.data.statusCode,
    }
    
    return resp;
    
  })
  .catch((error) => {
    
    return error;
  })

  return response;

}

export const authService = {getDataUser}
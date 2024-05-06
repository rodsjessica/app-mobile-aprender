import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IAuthData {
  accessToken: string;
  accessTokenExpires: string;
  codAluno: string;
  email: string;
  nome: string;
  token: string;
  tokenExpires: string;
}

export interface IAuth {
  data: IAuthData;
  message: string;
  statusCode: string;
}

export interface IAuthContext {
  signIn: (username: string, password: string) => Promise<IAuth>;
  auth?: IAuth;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>();
  const [isLoading, setisLoading] = useState(true);


  useEffect(() => {
    loadForStorage()
  }, [])

  async function loadForStorage() {
    try {

      const authstorage = await AsyncStorage.getItem('@universidadeFenabrave:auth');

      if(authstorage){
        const authData : IAuth = JSON.parse(authstorage);

        setAuth(authData);

      }
      
    } catch (error) {
      
    } finally {
      setisLoading(false);
    }
  }

  async function signIn(username: string, password: string): Promise<IAuth> {

    const resp = await authService.getDataUser(username, password);

    if(resp.message === 'Sucesso na requisição') {
      setAuth(resp);

      AsyncStorage.setItem('@universidadeFenabrave:auth', JSON.stringify(resp))

    } else if(username === '' && password === '') {
      Toast.show({
        type: "error",
        text1: "Verifique se os campos estão preenchidos."
      })
      
    } else if(username === ''){
      Toast.show({
        type: "error",
        text1: "Verifique se o usuário está preenchido."
      })

    }else if(password === ''){
      Toast.show({
        type: "error",
        text1: "Verifique se a senha está preenchida."
      })

    } else {
      Toast.show({
        type: "error",
        text1: "Verifique se o usuário ou senha está correto."
      })
      
    }

    return resp;
  }

  async function signOut():Promise<void>{
    setAuth(undefined);

    AsyncStorage.removeItem('@universidadeFenabrave:auth');

    return;
  }

  return (
    <AuthContext.Provider value={{ signIn, auth, isLoading, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;

}
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import { authService } from "../../services/authService";
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
  setAuth: any;
  checkTokenExpires: () => void;
  interval: any;
  intervalRef: any;
}

export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>();
  const [isLoading, setisLoading] = useState(true);
  const intervalRef = useRef<any>();

  //função para verificar se o token expirou
  const checkTokenExpires = () => {
    const date = moment().format('DD/MM/YYYY HH:mm:ss');

    if (auth?.data.tokenExpires !== null && auth?.data.tokenExpires !== undefined && moment(auth?.data.tokenExpires).format('DD/MM/YYYY HH:mm:ss') <= date) {

      clearInterval(intervalRef.current);
      intervalRef.current = null;

      signOut();

    }
  }

  //função que chama a cada segundo checkTokenExpires()
  const interval = () => {

    if (auth?.data.tokenExpires !== undefined && intervalRef.current === undefined || intervalRef.current === null) {

      intervalRef.current = setInterval(() => {
        checkTokenExpires();

      }, 1000)

    }

    // Limpeza do intervalo quando o componente for desmontado
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

  }

  useEffect(() => {
    loadForStorage();

  }, [])

  async function loadForStorage() {
    try {

      const authstorage = await AsyncStorage.getItem('@aprender:auth');

      if (authstorage) {
        const authData: IAuth = JSON.parse(authstorage);
        setAuth(authData);

      }

    } catch (error) {

    } finally {
      setisLoading(false);
    }
  }

  async function signIn(username: string, password: string): Promise<IAuth> {

    const resp = await authService.getDataUser(username, password);

    if (resp.message === 'Sucesso na requisição') {
      setAuth(resp);

      AsyncStorage.setItem('@aprender:auth', JSON.stringify(resp))

    } else if (username === '' && password === '') {
      Toast.show({
        type: "error",
        text1: "Verifique se os campos estão preenchidos."
      })

    } else if (username === '') {
      Toast.show({
        type: "error",
        text1: "Verifique se o usuário está preenchido."
      })

    } else if (password === '') {
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

  async function signOut(): Promise<void> {

    // Limpeza do intervalo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

    }

    setAuth(undefined);

    AsyncStorage.removeItem('@aprender:auth');

    return;
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      auth,
      isLoading,
      signOut,
      setAuth,
      checkTokenExpires,
      interval,
      intervalRef
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;

}
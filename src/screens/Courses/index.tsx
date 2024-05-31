import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';

import { WebView } from 'react-native-webview';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Container } from './styles';
// import { useAuth } from '../../contexts/AuthProvider';

let url = '';
let urlInitial = 'BASE_URL/Curso/MeusCursos';

export function Courses() {
  const [navigation, setNavigation] = useState('');
  const [click, setClick] = useState(false);
  const [webViewCanGoBack, setWebviewCanGoBack] = useState(false);
  const [key, setKey]= useState(1); //para reiniciar a url
  const webviewRef = useRef(null);

  //função para adicionar a opção 'voltar' 
  function showHeader() {

    if (Platform.OS === 'ios') {
       //verificação do FilesDB no indice da url webview
      if (navigation.indexOf('FilesDB') >= 0) {

        return <Header iconName={'arrow-left-box'} childToParent={childToParent} />
      }

    }
  }

    if (navigation.indexOf('FilesDB') === -1) {
      url = navigation;

    }

    //função para trazer o click do botão no componente Header
  const childToParent = (click: boolean) => {

    if(click === true){

      if(webViewCanGoBack){
        urlInitial = url;

        setKey(key + 1) //para reiniciar a webview
        // console.log(webviewRef.current)

      }
      
    }

    setClick(click)
  }


  return (
    <Container>
      {
        showHeader()
      }
      <WebView
        key={key}
        ref={webviewRef}
        source={{
          uri: urlInitial,
          // headers: {
          //   "Content-Type": "application/json; charset=utf-8",
          //   "Authorization": `Bearer ${token}`,
          // },
        }}
        renderLoading={() => <Loading />}
        startInLoadingState={true}
        scalesPageToFit={false}
        androidHardwareAccelerationDisabled={true}
        sharedCookiesEnabled={true}
        javaScriptEnabled={true}
        onNavigationStateChange={(data) => setNavigation(data.url)}
        onLoadProgress={({nativeEvent}) => {setWebviewCanGoBack(nativeEvent.canGoBack)}}
      />
    </Container>
  )
}
import React, { useEffect } from "react";
import { Alert, Linking, Platform } from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';

import { ThemeProvider } from "styled-components";
import { AuthProvider } from './src/contexts/AuthProvider';
import { CourseHomeProvider } from "./src/contexts/CourseProvider";
import { AllCoursesProvider } from "./src/contexts/AllCoursesProvider";

import theme from "./src/global/styles/theme";
import Router from "./src/routes/router";

export default function App() {

  useEffect(() => {
    // checkAppVersion();
  }, [])

  //funcão que verifiica a atualização das versões
  const checkAppVersion = async () => {
    const currentVersion = await VersionCheck.getCurrentVersion(); //versão atual
    const latestVersion = await VersionCheck.getLatestVersion(); //versão loja

    // console.log('currentVersion ====>', currentVersion, 'latestVersion ====>', latestVersion)

    if (Platform.OS === "ios") {
      if (currentVersion !== latestVersion) {
        Alert.alert(
          'Nova Atualização',
          'Existe uma nova versão disponível para atualização.',
          [
            { text: 'Ignorar', style: 'cancel' },
            { text: 'Atualizar', onPress: () => Linking.openURL('https://apps.apple.com/br/app/universidade-web-fenabrave-app/id6468810303') }
          ]
        );
      }


    }

    if (Platform.OS === "android") {
      if (currentVersion !== latestVersion) {
        Alert.alert(
          'Nova Atualização',
          'Existe uma nova versão disponível para atualização.',
          [
            { text: 'Ignorar', style: 'cancel' },
            { text: 'Atualizar', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=br.com.universidadefenabrave.app') }
          ]
        );
      }
    }

  }


  //Splash screen
  useEffect(() => {
    const ac = new AbortController();

    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);

    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CourseHomeProvider>
          <AllCoursesProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
          </AllCoursesProvider>
        </CourseHomeProvider>
      </AuthProvider>
    </GestureHandlerRootView>

  )
}
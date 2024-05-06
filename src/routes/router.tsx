import React from "react";
import { SafeAreaView, StatusBar } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";

import theme from '../global/styles/theme';
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useAuth } from "../contexts/AuthProvider";
import { Loading } from "../components/Loading";



export default function Router() {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.background} />
        <Loading />
      </SafeAreaView>

    );
  }

  return (
    <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.background} />
        {auth?.data.token === undefined ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  )
}
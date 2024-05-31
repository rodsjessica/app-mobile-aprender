import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Courses } from '../screens/Courses';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { MyCourses } from '../screens/MyCourses';
import { Solicitation } from '../screens/Solicitation';
import { ContentCourse } from '../screens/ContentCourse';
import { NewSolicitation } from '../screens/NewSolicitation';
import { Evaluation } from '../screens/Evaluation';

import { useNavigation } from '@react-navigation/native';
import Tabs from './tab.routes';

const Stack = createStackNavigator();

export default function AppRoutes() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen
        name='Courses'
        component={Courses}
        options={{ headerShown: false }} /> */}
      <Stack.Screen
        name='Home'
        component={Tabs}
        options={{ headerShown: false }} />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MyCourses'
        component={MyCourses}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Solicitation'
        component={Solicitation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ContentCourse'
        component={ContentCourse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NewSolicitation'
        component={NewSolicitation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Evaluation'
        component={Evaluation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

import React from 'react';
import { Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../global/styles/theme';

import { Home } from '../screens/Home';
import { MyCourses } from '../screens/MyCourses';
import { Solicitation } from '../screens/Solicitation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AllCourses } from '../screens/AllCourses';


const Tab = createBottomTabNavigator();

export default function Tabs(){
    return(
      <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.background,
        tabBarActiveBackgroundColor: theme.colors.primary,
        tabBarInactiveBackgroundColor: theme.colors.primary,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
        fontSize: 18,
      },
      tabBarStyle: {
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        height: Platform.OS === 'ios' ? 90 : 80,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: theme.colors.primary,
      },
      }}
      >
      <Tab.Screen
      name='Lançamentos'
      component={Home}
      options={{
        tabBarIcon: ({size, color}) => (
          <Icon name="rocket" size={size} color={color} />
        ),
        unmountOnBlur: true
      }}
    />
    <Tab.Screen
      name='Meus cursos'
      component={MyCourses}
      options={{
        tabBarIcon: ({size, color}) => (
          <Icon name="book-open-variant" size={size} color={color} />
        ),
        unmountOnBlur: true
      }}
    />
     <Tab.Screen
      name='Cursos'
      component={AllCourses}
      options={{
        tabBarIcon: ({size, color}) => (
          <Icon name="bookmark-box-multiple" size={size} color={color} />
        ),
        unmountOnBlur: true
      }}
    />
      </Tab.Navigator>
    )
  }
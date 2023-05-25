import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBar from './../components/AppBar';
import MakeAppointmentScreen from '../screens/MakeAppointmentScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import PastAppointmentsScreen from './../screens/PastAppointmentsScreen';
import AnalysisResultScreen from './../screens/AnalysisResultScreen';
import PrescriptionsScreen from './../screens/PrescriptionsScreen';
import AccountInfoScreen from './../screens/AccountInfoScreen';
import MedicinesScreen from './../screens/MedicinesScreen';
import AnalysisResultScreenByDate from './../screens/AnalysisResultScreenByDate';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreens = () => {

  // screens in tab-based navigation
  return (
    <>
      <AppBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'MakeAppointmentScreen') {
              iconName = focused
                ? require('../assets/icons/calendar-plus.png')
                : require('../assets/icons/calendar-plus-outline.png');
            }else if (route.name === 'AppointmentInfoScreen') {
                iconName = focused
                  ? require('../assets/icons/calendar.png')
                  : require('../assets/icons/calendar-outline.png');
            }else if (route.name === 'AccountInfoScreen') {
              iconName = focused
                ? require('../assets/icons/person.png')
                : require('../assets/icons/person-outline.png');
            } else if (route.name === 'AnalysisResultInfoScreen') {
                iconName = focused
                  ? require('../assets/icons/vials.png')
                  : require('../assets/icons/vials-outline.png');
            }else if (route.name === 'PrescriptionInfoScreen') {
              iconName = focused
              ? require('../assets/icons/prescription.png')
              : require('../assets/icons/prescription-outline.png');
            }
            return (
              <Image
                source={iconName}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName={'NewCallScreen'}
      >
        <Tab.Screen
          name="MakeAppointmentScreen"
          component={MakeAppointmentScreen}
          options={{
            tabBarLabel: 'Randevu Al',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AppointmentInfoScreen"
          options={{
            tabBarLabel: 'Randevu Bilgileri',
            headerShown: false,
          }}
        >
          {() => (
            <TopTab.Navigator>
              <TopTab.Screen
                name="AppointmentsScreen"
                component={AppointmentsScreen}
                options={{ tabBarLabel: 'Randevularım',headerShown: false }}
              />
              <TopTab.Screen
                name="PastAppointmentsScreen"
                component={PastAppointmentsScreen}
                options={{ tabBarLabel: 'Geçmiş Randevularım',headerShown: false }}
              />
            </TopTab.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AnalysisResultInfoScreen"
          options={{
            tabBarLabel: 'Tahlillerim',
            headerShown: false,
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="AnalysisResultScreen"
                component={AnalysisResultScreen}
                options={{ tabBarLabel: 'Tahlillerim',headerTitle: 'Tahlillerim'}}
              />
              <Stack.Screen
                name="AnalysisResultScreenByDate"
                component={AnalysisResultScreenByDate}
                options={{ tabBarLabel: 'Tahlil Detayı',headerTitle: 'Tahlil Detayı' }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="PrescriptionInfoScreen"
          options={{
            tabBarLabel: 'Reçetelerim',
            headerShown: false,
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="PrescriptionsScreen"
                component={PrescriptionsScreen}
                options={{ tabBarLabel: 'Reçetelerim',headerTitle: 'Reçetelerim'}}
              />
              <Stack.Screen
                name="MedicinesScreen"
                component={MedicinesScreen}
                options={{ tabBarLabel: 'Reçete Detayı',headerTitle: 'Reçete Detayı' }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AccountInfoScreen"
          component={AccountInfoScreen}
          options={{
            tabBarLabel: 'Hesabım',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabScreens;

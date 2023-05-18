import React, { useMemo,useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './src/contexts/AuthContext';
import LoginScreens from './src/screenGroups/LoginScreens';
import TabScreens from './src/screenGroups/TabScreens';
import { socket } from './src/services/SocketService';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authContext = useMemo(
    () => ({
      login: async (userInfo) => {
        try {
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          await AsyncStorage.setItem('id', JSON.stringify(userInfo));
        } catch (err) {
          console.error(err);
        }
        await setIsLoggedIn(true);
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('id');
        } catch (err) {
          console.error(err);
        }
        await setIsLoggedIn(false);
      },
    }),
    []
  );

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        socket.connectSocket();
        const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
        const isLoggedInParsedValue = JSON.parse(isLoggedInValue);
        if (isLoggedInParsedValue !== null) {
          setIsLoggedIn(isLoggedInParsedValue);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    isUserLoggedIn();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <Image
          source={require('./src/assets/logos/hospital.png')}
          resizeMode="contain"
          style={styles.loadingImage}
          alt="hospital"
        />
        <Text style={styles.loadingText}>v.1.0.0</Text>
      </View>
    );
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {!isLoggedIn ? (
              <Stack.Screen
              name="LoginScreens"
              component={LoginScreens}
              options={{ headerShown: false }}
              />
              ) : (
                <Stack.Screen
                name="TabScreens"
                component={TabScreens}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingImage: {
    width: '45%',
    height: '45%',
  },
  loadingText: {
    position: 'absolute',
    bottom: 10,
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 6,
  },
});

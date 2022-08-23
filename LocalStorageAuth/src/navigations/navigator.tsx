import React, {useState, useEffect} from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AppScreens } from './appScreens'
import { StoreKey } from '../utils/asyncStoreKeys'
import { AsyncStorageHelper } from '../utils/storage'

export type NavigatorParamList = {
  loginScreen: undefined
  signUpScreen: undefined
  homeScreen: undefined
}


const AuthStack = createNativeStackNavigator()
const RootStack = createNativeStackNavigator()
export function AppStack () {
  const [user, setUser] = useState(null)
  useEffect(() => {
    async function getUser(){
      AsyncStorageHelper.retrieveData(StoreKey.user, async (_user) => {
        if (_user) {
          setUser(_user)
          console.log(_user)
        }
      });
    }
    getUser()
  },[])

  return (user ? <HomeScreen/>  : <AuthScreen/>)
}

export const HomeScreen = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: "portrait",
          gestureEnabled: false,
        }}
      >
        <RootStack.Screen
          name={AppScreens.homeScreen.name as any}
          component={AppScreens.homeScreen.component}
        />
      </RootStack.Navigator>
    )
  }
  
  export const AuthScreen = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: "portrait",
          gestureEnabled: false,
        }}
        initialRouteName={AppScreens.loginScreen.name}
      >
        <AuthStack.Screen
          name={AppScreens.loginScreen.name as any}
          component={AppScreens.loginScreen.component}
        />
        <AuthStack.Screen
          name={AppScreens.signUpScreen.name as any}
          component={AppScreens.signUpScreen.component}
        />
      </AuthStack.Navigator>
    )
  }

  
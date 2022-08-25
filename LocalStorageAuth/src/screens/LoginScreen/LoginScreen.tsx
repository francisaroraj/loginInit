import React, { useState } from 'react'
import {View,TouchableOpacity, KeyboardAvoidingView, Platform, Text, Keyboard} from 'react-native';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { StoreKey } from '../../utils/asyncStoreKeys';
import { AsyncStorageHelper } from '../../utils/storage';
import { palette } from '../../theme/colors';
import { CTextInput } from '../../components/CTextInput/CTextInput';
import { KeyboardTypeCustom } from '../../utils/enum';
import { AppScreens } from '../../navigations/appScreens';
import { styles } from './styles';


export default function LoginScreen() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isError, setIsError] = useState(false)
    
  
  useFocusEffect(
    React.useCallback(() => {
      setEmail('')
      setPassword('')
      setError('')
      setIsError(false)
    }, []),
  )

  const loginPress = async () => {
    Keyboard.dismiss()
    await AsyncStorageHelper.retrieveData(StoreKey.user,async (_profile) => {
      if (_profile) {
        const data = JSON.parse(_profile);
        const index = data.findIndex(element => {
          if (element.user.email === email) {
            return true;
          }
          return false;
        });
        if(index === -1){
          setIsError(true)
          setError('Invalid user, please sign in.')
          return
        }
       
        const user = data[index]
        if(user.user.password === password){
          setIsError(false)
          setError('')
          await AsyncStorageHelper.storeData(StoreKey.loggedIn,JSON.stringify([{user:{email:email,password:password}}]))
          resetNavigation(AppScreens.homeScreen.name, user)
        }else{
          setIsError(true)
        }
      }
      
    })

  }
  
  const resetNavigation = (screen, data?)=>{
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: screen,
            params: { user: data },
          },
        ],
      })
    );
  }

  const gotoSignin =()=>{
    navigation.navigate(AppScreens.signUpScreen.name)
  }

return(
  <KeyboardAvoidingView  style={styles.container}>
    <View style={styles.view}>
      <View style={styles.curvedView}>
      <CTextInput
        hint={'Email'}
        onChangeText={(value)=>{ setEmail(value)} }
        keyboardType={KeyboardTypeCustom.EMAIL}
        value={email}
        errorMessage={error}
        isFocus={true}
        isError={isError}
      />
       <CTextInput
        hint={'Password'}
        onChangeText={(value)=>{ setPassword(value)} }
        keyboardType={KeyboardTypeCustom.DEFAULT}
        value={password}
        securedEntryEye={true}
        securedEntryDisabled={false}
        errorMessage={''}
      />
      <TouchableOpacity 
        style={styles.login}
        onPress={loginPress}>
         <Text style={{alignSelf:'center'}}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signUp}
        onPress={gotoSignin}>
         <Text style={{alignSelf:'center'}}>sign in</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    </KeyboardAvoidingView>
)
}
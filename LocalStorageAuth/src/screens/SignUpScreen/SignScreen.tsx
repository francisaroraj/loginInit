import React, { useState } from 'react'
import {View,TouchableOpacity, KeyboardAvoidingView, Platform, Text, Keyboard,Alert} from 'react-native';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { StoreKey } from '../../utils/asyncStoreKeys';
import { AsyncStorageHelper } from '../../utils/storage';
import { CTextInput } from '../../components/CTextInput/CTextInput';
import { palette } from '../../theme/colors';
import { KeyboardTypeCustom } from '../../utils/enum';
import { validateEmail } from '../../utils/validator';
import { AppScreens } from '../../navigations/appScreens';
import { styles } from './styles';


export default function SignScreen() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [ageError, setAgeError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('Password should match')
    const [conPasswordErrorMsg, setConPasswordErrorMsg] = useState('Password should match')
    const [emailErrorMsg, setEmailErrorMsg] = useState('Email cannot be empty')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')

  
    useFocusEffect(
      React.useCallback(() => {
      }, []),
    )

    const signUpPress = async () =>{
      Keyboard.dismiss()
      if(name===''){setNameError(true); return}
      if(age===''){setAgeError(true); return}
      if(phone===''){setPhoneError(true); return}
      if (!validateEmail(email)) {
        setEmailError(true);
        return;
      }
      if(password===''){
        setPasswordErrorMsg('Password cannot be empty'); 
        setPasswordError(true); 
        return
      }
      if(confirmPassword===''){       
         setConPasswordErrorMsg('confirm password cannot be empty');
         setConfirmPasswordError(true); 
         return}
      if(city===''){setCityError(true); return}

      if(password!==confirmPassword){
        setPasswordError(true);
        setConfirmPasswordError(true); 
        setPasswordErrorMsg('Password should match')
        setConPasswordErrorMsg('Password should match')
        return
      }

      await AsyncStorageHelper.retrieveData(StoreKey.user,async (_profile) => {
          if (_profile) {
            const data = JSON.parse(_profile);
            const index = data.findIndex(element => {
              if (element.user.email === email) {
                return true;
              }
              return false;
            });
            if(index !== -1){
              setEmailError(true)
              setEmailErrorMsg('User already exist')
              return
            }
            const userData = {user:{
              name:name,
              age:age,
              phoneNumber:phone,
              email:email,
              password:password,
              city:city
            }}
            const newUserData = [...data,userData];

            await AsyncStorageHelper.storeData(StoreKey.user, JSON.stringify(
              newUserData
            ));
            Alert.alert('Alert', 'You have successfully signed up, please login.', [
              {
                text: 'OK',
                onPress: () => {
                  resetNavigation(AppScreens.loginScreen.name)
                },
              },
            ]);
          }});
    }

    const resetNavigation = (screen)=>{
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: screen },
          ],
        })
      );
    }

    function goBack(){
      navigation.goBack()
    }

return(
  <KeyboardAvoidingView  style={styles.container}>
    

  <View style={styles.view}>
 
    <View style={styles.form}>
      <CTextInput
        hint={'Name'}
        onChangeText={(value)=>{setNameError(false); setName(value)} }
        value={name}
        keyboardType={KeyboardTypeCustom.DEFAULT}
        errorMessage={'Name cannot be empty'}
        isError={nameError}
        securedEntryDisabled={true}
      />
      <CTextInput
        hint={'Age'}
        onChangeText={(value)=>{setAgeError(false); setAge(value)} }
        value={age}
        errorMessage={'Age cannot be empty'}
        keyboardType={KeyboardTypeCustom.NUMERIC}
        isError={ageError}
        securedEntryDisabled={true}
      />
      <CTextInput
        hint={'Phone number'}
        onChangeText={(value)=>{setPhoneError(false); setPhone(value)} }
        value={phone}
        errorMessage={'Phone number cannot be empty'}
        keyboardType={KeyboardTypeCustom.NUMERIC}
        isError={phoneError}
        securedEntryDisabled={true}
      />
      <CTextInput
        hint={'Email'}
        onChangeText={(value)=>{setEmailError(false); setEmail(value)} }
        keyboardType={KeyboardTypeCustom.EMAIL}
        value={email}
        errorMessage={emailErrorMsg}
        isError={emailError}
      />
      <CTextInput
        hint={'Password'}
        onChangeText={(value)=>{setPhoneError(false); setPassword(value)} }
        keyboardType={KeyboardTypeCustom.DEFAULT}
        value={password}
        securedEntryEye={true}
        securedEntryDisabled={false}
        errorMessage={passwordErrorMsg}
        isError={passwordError}
      />
      <CTextInput
        hint={'Confirm password'}
        onChangeText={(value)=>{setConfirmPasswordError(false); setConfirmPassword(value)} }
        keyboardType={KeyboardTypeCustom.DEFAULT}
        value={confirmPassword}
        securedEntryEye={true}
        securedEntryDisabled={false}
        errorMessage={conPasswordErrorMsg}
        isError={confirmPasswordError}
      />
      <CTextInput
        hint={'City'}
        onChangeText={(value)=>{setCityError(false); setCity(value)} }
        value={city}
        errorMessage={'City cannot be empty'}
        isError={cityError}
        securedEntryDisabled={true}
      />
      
      <TouchableOpacity 
        style={styles.signUp}
        onPress={signUpPress}>
          <Text style={{alignSelf:'center'}}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity 
      style={styles.back}
      onPress={goBack}>
        <Text style={{alignSelf:'center'}}>back</Text>
  </TouchableOpacity>
  </View>
  </KeyboardAvoidingView>
)
}
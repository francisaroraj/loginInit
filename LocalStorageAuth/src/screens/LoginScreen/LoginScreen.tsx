import React, { useState } from 'react'
import {
    View,
    TextInput
  } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StoreKey } from '../../utils/asyncStoreKeys';
import { AsyncStorageHelper } from '../../utils/storage';


export default function LoginScreen() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    
  
    useFocusEffect(
      React.useCallback(() => {
        const timerId = setTimeout(async () => {
          AsyncStorageHelper.storeData(StoreKey.user, JSON.stringify([{email:'mfaroraj@gmail.com'}]));
        }, 100)
        return () => clearTimeout(timerId)
      }, []),
    )
return(
    <View style={{flex:1}}>
      <TextInput
        style={[
          securedEntryEye ? styles.textInputPassword : styles.textInput,
          { color: textColor },
        ]}
        value={value}
        maxLength={20}
        placeholder={'email'}
        onChangeText={onChangeText}
        // secureTextEntry={isShowPassword}
        // Making the Under line Transparent.
        selectionColor={AppColors.labelColor}
        keyboardType={keyboardType}
        placeholderTextColor={hintColor}
        editable={editable}
        onBlur={onBlur}
      />
    </View>
)
}
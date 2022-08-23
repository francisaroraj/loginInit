import React, { useState } from 'react'
import {
    View,
    Text
  } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'


export default function SignScreen() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    
  
    useFocusEffect(
      React.useCallback(() => {
        const timerId = setTimeout(() => {
          
        }, 100)
        return () => clearTimeout(timerId)
      }, []),
    )
return(
    <View style={{flex:1}}>
      <Text style={{margin:50,color:'#121'}}>Sign in</Text>
    </View>
)
}
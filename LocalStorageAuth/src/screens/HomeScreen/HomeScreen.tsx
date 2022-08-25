import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity
  } from 'react-native';
import { useFocusEffect, useNavigation, CommonActions, useRoute } from '@react-navigation/native'
import { palette } from '../../theme/colors';
import { AppScreens } from '../../navigations/appScreens';
import { StoreKey } from '../../utils/asyncStoreKeys';
import { AsyncStorageHelper } from '../../utils/storage';
import { styles } from './styles';


export default function HomeScreen() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [userShow, setUserShow] = useState(false)
  
    useFocusEffect(
      React.useCallback(() => {
        setUserShow(false)        
      }, []),
    )

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

    async function logout(){
      await AsyncStorageHelper.storeData(StoreKey.loggedIn,'')
      resetNavigation(AppScreens.loginScreen.name)
    }

    const syncData = async ()=>{
      await AsyncStorageHelper.retrieveData(StoreKey.loggedIn, async (_user) => {
        if (_user) {
          const userLoggedIn = JSON.parse(_user)
          await AsyncStorageHelper.retrieveData(StoreKey.user,async (_profile) => {
            if (_profile) {
              const data = JSON.parse(_profile);
              const index = data.findIndex(element => {
                if (element.user.email === userLoggedIn[0].user.email) {
                  return true;
                }
                return false;
              });
              if(index === -1){
                return
              }
              const user = data[index]
              setUser(user)
              setUserShow(true)
            }
          });
        }
      });
    }

return(
    <View style={{flex:1}}>
      <TouchableOpacity 
        style={styles.logout}
        onPress={logout}>
          <Text style={{alignSelf:'center'}}>Log out</Text>
      </TouchableOpacity>

      <Text style={styles.welcome}>Welcome to home!</Text>

      {userShow && <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.value}>{user?.user?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Phone:</Text>
          <Text style={styles.value}>{user?.user?.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Age:</Text>
          <Text style={styles.value}>{user?.user?.age}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.value}>{user?.user?.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>City:</Text>
          <Text style={styles.value}>{user?.user?.city}</Text>
        </View>
      </View>}

      <TouchableOpacity 
        style={styles.syncButton}
        onPress={syncData}>
          <Text style={{alignSelf:'center'}}>Sync</Text>
      </TouchableOpacity>

      
    </View>
)
}
import { StyleSheet } from 'react-native';
import { palette } from '../../theme/colors';

export const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:palette.gray,padding:16,justifyContent:'center'},
    view:{flex:1,justifyContent:'center'},
    curvedView:{backgroundColor:palette.green,paddingHorizontal:16,paddingVertical:30,borderRadius:10},
    login:{height:60,width:300,marginTop:20,backgroundColor:palette.skyBlue,borderRadius:60/2,alignSelf:'center',justifyContent:'center'},
    signUp:{height:30,width:300,marginTop:20,borderRadius:60/2,alignSelf:'center',justifyContent:'center'}
})
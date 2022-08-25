import { StyleSheet } from 'react-native';
import { palette } from '../../theme/colors';

export const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:palette.gray,padding:16,justifyContent:'center'},
    view:{flex:1,justifyContent:'center'},
    form:{backgroundColor:palette.green,paddingHorizontal:16,paddingVertical:50,borderRadius:10,},
    signUp:{height:60,width:300,marginTop:20,backgroundColor:palette.skyBlue,borderRadius:60/2,alignSelf:'center',justifyContent:'center'},
    back:{height:60,width:60,top:0,left:0,position:'absolute',backgroundColor:palette.skyBlue,borderRadius:60/2,justifyContent:'center',marginRight:5,marginTop:5},

})
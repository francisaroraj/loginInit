import { StyleSheet } from 'react-native';
import { palette } from '../../theme/colors';

export const styles = StyleSheet.create({
    logout:{height:60,width:60,top:5,right:5,position:'absolute',backgroundColor:palette.skyBlue,borderRadius:60/2,justifyContent:'center'},
    welcome:{margin:50,color:'#121',fontSize:20},
    container:{backgroundColor:palette.skyBlue,justifyContent:'space-around',paddingHorizontal:16,paddingVertical:30},
    row:{flexDirection:'row'},
    title:{height:50},
    value:{height:50,paddingLeft:10},
    syncButton:{height:60,width:60,bottom:5,right:5,position:'absolute',backgroundColor:palette.skyBlue,borderRadius:60/2,justifyContent:'center'}

})
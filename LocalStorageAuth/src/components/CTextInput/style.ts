import { StyleSheet } from 'react-native';
import { palette } from '../../theme/colors';

export const styles = StyleSheet.create({
  errorText: {
    color: palette.red,
    fontSize: 10,
    marginHorizontal: 5,
    marginTop: 10,
  },
  secureEye: { alignSelf: 'flex-end', height: 25, marginTop: 8, position: 'absolute', width: 50,marginRight:8 },
  text: {
    color: palette.black,
    fontSize: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: palette.gray,
    height: 40,
    padding: 5,
    width: '100%',
  },
  textInputPassword: {
    borderBottomWidth: 1,
    borderColor: palette.gray,
    height: 40,
    paddingEnd: 20,
    padding: 5,
    width: '100%',
  },
  view: {
    flexDirection: 'column',
    width: '100%',
  },
});

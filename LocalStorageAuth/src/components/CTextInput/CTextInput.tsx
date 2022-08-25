import React, { useState } from 'react';
import { TextStyle, TouchableOpacity, TextInput, View, ViewStyle, Text } from 'react-native';
import { styles } from './style';
import { palette } from '../../theme/colors';
import {KeyboardTypeCustom} from '../../utils/enum';


interface CTextInputProps {
  hint: string;
  hintColor?: string;
  textColor?: string;
  onChangeText: (any) => void;
  textStyle?: TextStyle;
  keyboardType?: KeyboardTypeCustom;
  maxLength?: any;
  value?: string;
  editable?: boolean;
  securedEntryEye?: boolean;
  securedEntryDisabled?: boolean;
  errorMessage?: string;
  isFocus?: boolean;
  isError?: boolean;
  isMultiLine?: boolean;
}
export const CTextInput: React.FC<CTextInputProps> = (props) => {
  const {
    keyboardType,
    maxLength,
    value,
    textColor,
    onChangeText,
    hint,
    hintColor,
    editable,
    securedEntryEye,
    securedEntryDisabled,
    errorMessage,
    isFocus,
    isError,
    isMultiLine,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState(!securedEntryDisabled);
  const [values, setValues] = useState(value);
  // const [isError, setIsError] = useState(false);
  const onIconPress = () => {
    setIsShowPassword(!isShowPassword);
  };
  const onValidate = (onValueChanged) => {
    // setIsError(!isError);
    setValues(onValueChanged);
    onChangeText(onValueChanged);
  };
  return (
    <View>
      <View style={styles.view}>
        <TextInput
          style={[
            securedEntryEye ? styles.textInputPassword : styles.textInput,
            { color: textColor },
          ]}
          value={values}
          // Adding hint in TextInput using Placeholder option.
          maxLength={maxLength}
          placeholder={hint}
          onChangeText={onValidate}
          autoFocus={isFocus}
          secureTextEntry={isShowPassword}
          // Making the Under line Transparent.
          underlineColorAndroid={palette.transparent}
          selectionColor={palette.black}
          keyboardType={keyboardType}
          placeholderTextColor={hintColor}
          editable={editable}
        />
        {securedEntryEye && (
          <TouchableOpacity onPress={onIconPress} style={styles.secureEye}>
            {isShowPassword ? (
              <Text>Show</Text>
            ) : (
              <Text>Hide</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.errorText}>{isError ? errorMessage : ' '}</Text>
    </View>
  );
};
CTextInput.defaultProps = {
  hint: 'hint',
  hintColor: palette.gray,
  keyboardType: KeyboardTypeCustom.DEFAULT,
  securedEntryEye: false,
  securedEntryDisabled: false,
  isFocus: false,
  errorMessage: 'Invalid Entry.',
  editable: true,
  isMultiLine: false,
  isAutoCapitalized: 'none',
};

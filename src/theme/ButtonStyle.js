import {lightTheme} from './colors';
import {StyleSheet} from 'react-native';
import {font} from '../constants';
export const buttonStyles = StyleSheet.create({
    primaryButtonStyle: {
      height: 70,
      padding: 12,
      marginHorizontal:25,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: lightTheme.PRIMARY_COLOR,
    },
    primaryButtonTextStyle: {
        fontFamily:font.SEMI_BOLD,
        fontSize:17,
        color:lightTheme.SECONDARY_BUTTON_COLOR

      },
   
  });
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
        fontSize:16,
        color:lightTheme.SECONDARY_BUTTON_COLOR

      },
      appointmentButtonStyle: {
        height: 50,
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#344356',
        marginHorizontal:5,
      },

      appointmentWhiteButtonStyle: {
        height: 28,
        borderRadius: 3,
        paddingHorizontal:5,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:lightTheme.SMALL_BODY_TEXT_COLOR,
        borderWidth:0.6,
        backgroundColor: '#FFF',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
        marginHorizontal:5,
      },
      appointmentOrangeButtonStyle: {
        height: 28,
        borderRadius: 3,
        paddingHorizontal:5,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#F3603F',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
        marginHorizontal:5
      },
      appointmentTransparentButtonStyle: {
        height: 50,
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth:0.5,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomColor:'#344356',
        backgroundColor: '#FFF',
        marginHorizontal:5,
      },
   
  });
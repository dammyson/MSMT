import {lightTheme} from './colors';
import {StyleSheet} from 'react-native';
import {font} from '../constants';

export const textInputStyles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 20,
    height: 45,
    marginBottom: 15,
    marginTop: 5,
    borderBottomWidth: 0.6,
    borderBottomColor: lightTheme.TEXT_PLACEHOLDER_COLOR,
    borderRadius: 10
},
searchTextInputContainer:{
    flexDirection: 'row',
    height: 55,
    marginBottom: 15,
    marginTop: 5,
    borderWidth: 0.6,
    borderColor: lightTheme.TEXT_PLACEHOLDER_COLOR,
    borderRadius: 10
},
input: {
    flex: 1,
    marginLeft: 5,
},
action_text: {
    color: lightTheme.TEXT_PLACEHOLDER_COLOR,
    fontFamily: font.SEMI_BOLD,
    fontSize: 15,
    marginBottom: 2,
    marginTop: 2
},
operation_icon: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
secondSearchTextInputContainer:{
    flexDirection: 'row',
    height: 45,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor:'#F2F3F2',
    borderRadius: 5
},


textAreaContainer: {
    height: 100,
    backgroundColor: '#F2F3F2',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
},
textArea: {
    height: 85,
    justifyContent: "flex-start",
    margin: 10,
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 13,
    fontFamily: font.SEMI_BOLD,
},

  });
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { Root } from 'native-base';
import Main from './src/navigations/app-stack';
import { SafeAreaView } from 'react-native';

  //console.disableYellowBox = true;

  export default class App extends Component {

  render() {
    const Stack = createStackNavigator();
    const deepLinking ={
      prefixes: ['https://msmt.me', 'msmt.me://'],
      config:{
        Home: 'Splash',
        Details:{
          path: 'details/:itemId',
          params:{
            itemId:null
          }
        }
      }
    }
    return (
      <Root>
          <Main/>
          <FlashMessage position="top"/> 
        </Root>
      );
  }

}
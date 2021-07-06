import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/user/Login';
import Register from '../screens/user/Register';
import Users from './app-navigator';
import SlectUserType from '../screens/user/SlectUserType';
import WebRegister from '../screens/user/WebRegister';
import Done from '../screens/user/Done';




//console.disableYellowBox = true;

class AuthStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerShown: false,
             }}
             initialRouteName="Login">

            <Stack.Screen name="Login" component={Login}  />
            <Stack.Screen name="user_type" component={SlectUserType}  />
            <Stack.Screen name="Regi" component={Register}  />
            <Stack.Screen name="Reg" component={WebRegister}  />
            <Stack.Screen name="rdone" component={Done}  />
          </Stack.Navigator>
      );
  }

}
export default AuthStack;
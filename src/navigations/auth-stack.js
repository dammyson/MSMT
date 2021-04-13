import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/user/Login';
import Register from '../screens/user/Register';
import Users from './app-navigator';
import SlectUserType from '../screens/user/SlectUserType';




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
            <Stack.Screen name="Reg" component={Register}  />
            <Stack.Screen name="Users" component={Users}  />
            
          </Stack.Navigator>
      );
  }

}
export default AuthStack;
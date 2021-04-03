import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
 import AuthStack from './auth-stack';
import Splash from '../screens/onBoarding/Splash';
import Welcome from '../screens/onBoarding/Welcome';
import App from './app-navigator';
import TimeData from '../screens/appointment/TimeDate';



//console.disableYellowBox = true;

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
      <Root>
        <NavigationContainer >
      
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerShown: false,
             }}
             initialRouteName="tm">

            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="Welcome" component={Welcome}  />
            <Stack.Screen name="Auth" component={AuthStack}  /> 
            <Stack.Screen name="App" component={App}  /> 
            <Stack.Screen name="tm" component={TimeData}  /> 
          
          </Stack.Navigator>
        </NavigationContainer>
        </Root>
      );
  }

}
export default AppStack;
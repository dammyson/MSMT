import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import PrescriptionDetail from './PrescriptionDetail';


class PreStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
     
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerShown: false,
             }}
             initialRouteName="prescription">

            <Stack.Screen name="prescription" component={Index}  />
           <Stack.Screen name="prescription_details" component={PrescriptionDetail}  /> 
           
          
          </Stack.Navigator>
      );
  }

}
export default PreStack;
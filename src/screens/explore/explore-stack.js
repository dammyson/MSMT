import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './';
import ExploreDetails from './DoctorDetail';


class ExploreStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
     
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerShown: false,
             }}
             initialRouteName="explore">

            <Stack.Screen name="explore" component={Index}  />
            <Stack.Screen name="explore_details" component={ExploreDetails}  />
           
          
          </Stack.Navigator>
      );
  }

}
export default ExploreStack;
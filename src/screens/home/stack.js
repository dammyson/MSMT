import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '.';
import Explore from '../explore/index';
import TimeData from '../appointment/TimeDate';
import AppointmentInformation from '../appointment/AppointmentInformation';
import Billing from '../appointment/Billing';
import ModePayment from '../appointment/ModePayment';
import ExploreDetails from '../explore/DoctorDetail';


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
             initialRouteName="home">

            <Stack.Screen name="home" component={Index}  />
            <Stack.Screen name="provider_listing" component={Explore}  />
            <Stack.Screen name="appointment_datetime" component={TimeData}  /> 
            <Stack.Screen name="appointment_information" component={AppointmentInformation}  /> 
            <Stack.Screen name="appointment_billing" component={Billing}  /> 
            <Stack.Screen name="mode_appointment" component={ModePayment}  /> 
            <Stack.Screen name="provider_details" component={ExploreDetails}  />
            
           
          
          </Stack.Navigator>
      );
  }

}
export default ExploreStack;
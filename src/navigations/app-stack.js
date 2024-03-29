import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
 import AuthStack from './auth-stack';
import Splash from '../screens/onBoarding/Splash';
import Welcome from '../screens/onBoarding/Welcome';
import App from './app-navigator';
import ProviderApp from './provider-navigator';
import TimeData from '../screens/appointment/TimeDate';
import AppointmentInformation from '../screens/appointment/AppointmentInformation';
import Billing from '../screens/appointment/Billing';
import ModePayment from '../screens/appointment/ModePayment';
import Payment from '../screens/appointment/Payment';
import Done from '../screens/appointment/Done';
import MyAppointment from '../screens/appointment/MyAppointment';
import DoctorMyAppointment from '../screens/appointment/DoctorMyAppointment';
import WriteReview from '../screens/appointment/WriteReview';
import Settings from '../screens/settings';
import Session from '../screens/settings/Session';
import SessionDetail from '../screens/settings/SessionDetail';
import Referer from '../screens/settings/Referer';
import Account from '../screens/settings/Account';
import About from '../screens/settings/About';
import DoctorIndex from '../screens/home/index_doctor';
import BankInformation from '../screens/settings/BankInformation';
import Notification from '../screens/Notification';
import RateSheet from '../screens/settings/RateSheet';
import Scheduling from '../screens/settings/Scheduling';
import MakeAppointment from '../screens/settings/MakeAppointment';
import ViewAppointment from '../screens/settings/ViewAppointment';
import SlectUserType from '../screens/user/SlectUserType';
import Intro from '../screens/onBoarding/Intro';
import ExploreScreen from '../screens/explore/explore-stack';
import Availability from '../screens/settings/Availability';



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
             initialRouteName="Splash">

            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="Intro" component={Intro}  />
            <Stack.Screen name="Welcome" component={Welcome}  />
          
            <Stack.Screen name="Auth" component={AuthStack}  /> 
            <Stack.Screen name="App" component={App}  /> 
            <Stack.Screen name="ProviderApp" component={ProviderApp}  /> 
           
            <Stack.Screen name="payment" component={Payment}  /> 
            <Stack.Screen name="done" component={Done}  /> 
            <Stack.Screen name="Referer" component={Referer}  /> 
            <Stack.Screen name="Account" component={Account}  /> 
            <Stack.Screen name="Notification" component={Notification}  /> 
            <Stack.Screen name="Session" component={Session}  /> 
            <Stack.Screen name="BankInformation" component={BankInformation}  /> 
            <Stack.Screen name="provider_ment_details" component={DoctorMyAppointment}  /> 
            <Stack.Screen name="apointment_details" component={MyAppointment}  /> 
            <Stack.Screen name="availability" component={Availability}  /> 
      
          
          </Stack.Navigator>
        </NavigationContainer>
        </Root>
      );
  }

}
export default AppStack;
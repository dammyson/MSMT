import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
 import AuthStack from './auth-stack';
import Splash from '../screens/onBoarding/Splash';
import Welcome from '../screens/onBoarding/Welcome';
import App from './app-navigator';
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
            <Stack.Screen name="tm" component={ViewAppointment}  /> 
          
          </Stack.Navigator>
        </NavigationContainer>
        </Root>
      );
  }

}
export default AppStack;
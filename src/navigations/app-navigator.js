import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Icon, } from 'react-native-elements';
import { lightTheme } from '../theme/colors';
import HomeScreen from '../screens/home/stack';
import ExploreScreen from '../screens/explore/explore-stack';
import PrescriptionScreen from '../screens/prescription/presscription-stack';
import { View,Text, Dimensions } from 'react-native';
import Settings from '../screens/settings';
import Appointments from '../screens/appointment';
import { font } from '../constants';



const Tab = createBottomTabNavigator();

class AppNavigator extends Component {

  render() {
    let menuBarIcon;

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home-outline';
              return <View style={{width:Dimensions.get('window').width/5}}>
               <Icon
                active
                name={iconName}
                size={27}
                color={color}
                type='ionicon'
              />
               <Text style={{ marginTop: 1, fontFamily: font.SEMI_BOLD, marginRight: 7, marginLeft: 7,fontSize: 10, color: color, textAlign: 'center',}}>Home</Text>
              </View>;
            }
            else if (route.name === 'Add') {
              iconName = 'calendar-plus-o';
              return <View style={{width:Dimensions.get('window').width/5}}>
              <Icon
                active
                name={iconName}
                size={27}
                color={color}
                type='font-awesome'
              />
               <Text style={{ marginTop: 1, fontFamily: font.SEMI_BOLD,  marginRight: 7, marginLeft: 7,fontSize: 10, color: color, textAlign: 'center',}}>Visit</Text>
              </View>;
            } else if (route.name === 'Setting') {
              iconName = 'heart-o';
              return<View style={{width:Dimensions.get('window').width/5}}>
               <Icon
                active
                name={iconName}
                size={27}
                color={color}
                type='font-awesome'
              />
               <Text style={{ marginTop: 1, fontFamily: font.SEMI_BOLD,  marginRight: 7, marginLeft: 7,fontSize: 10, color: color, textAlign: 'center',}}>Meds</Text>
              </View>;
            }
            else if (route.name === 'User') {
              iconName = 'account-tie-outline';
              return<View style={{width:Dimensions.get('window').width/5}}>
               <Icon
                active
                name={iconName}
                size={27}
                color={color}
                type='material-community'
              />
               <Text style={{ marginTop: 1,fontFamily: font.SEMI_BOLD,  marginRight: 7, marginLeft: 7,fontSize: 10, color: color, textAlign: 'center',}}>Account</Text>
              </View>;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: lightTheme.PRIMARY_COLOR,
          inactiveTintColor: lightTheme.BLACK_TEXT_COLOR,
          style: { height: 60 },
          showLabel: false,
          keyboardHidesTabBar: true
          

        }}
      >


        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={Appointments} />
        <Tab.Screen name="Setting" component={PrescriptionScreen} />
        <Tab.Screen name="User" component={Settings} />

      </Tab.Navigator>

    );
  }

}

export default AppNavigator;
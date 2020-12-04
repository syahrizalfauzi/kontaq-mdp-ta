import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Contacts from './contacts';
import Profile from './profile';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      tabBarOptions={{
        activeTintColor: 'darkblue',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({route}) => ({
        tabBarIcon:({focused, color, size}) =>{
          let iconName;

          if(route.name === 'Contacts')
            iconName = 'people';
          else
            iconName = 'person';
          
          if(!focused)
            iconName += '-outline';

          return <Icon name={iconName} size={size} color={color} />
        }
      })}
      >
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
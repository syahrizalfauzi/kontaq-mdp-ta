/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import Dashboard from './lib/screens/dashboard/dashboard';
import Detail from './lib/screens/detail';
import SplashScreen from './lib/screens/splashscreen';
import Profile from './lib/screens/dashboard/profile';
import Contacts from './lib/screens/dashboard/contacts';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Contacts" component={Contacts} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

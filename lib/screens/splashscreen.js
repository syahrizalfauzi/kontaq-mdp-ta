import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackActions} from '@react-navigation/native';

export default function SplashScreen({navigation}) {
  setTimeout(
    () => navigation.dispatch(StackActions.replace('Contacts')),
    1000,
  );

  return (
    <View style={styles.container}>
      <Icon name="people-circle" size={128} color="#5288F8" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 32,
  },
});

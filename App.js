import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducers'
import { purple } from './utils/colors';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {  View, Image} from 'react-native';
import Constants from 'expo-constants';
import MainNavigator from './navigation/TabNavigation';
import middleware from './middleware';
import {setLocalNotification} from './utils/api'




function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 50 }}
      source={require('./logo.png')}
    />
  );
}


function FlashCardStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab =  createBottomTabNavigator();

export default class App extends Component {
    componentDidMount() {
      setLocalNotification()
  }

  render() {
    
      return (
    <Provider store={createStore(reducer,middleware)}>
      <FlashCardStatusBar  backgroundColor={'#00834e'} barStyle="light-content" />
      
        <NavigationContainer>
        <MainNavigator />      
      </NavigationContainer>
  
 
    </Provider>
  );
  }

}

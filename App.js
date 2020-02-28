import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import * as firebase from 'firebase'

import React from 'react'

var firebaseConfig = {
  apiKey: "AIzaSyC2Uq01gvQiBYVj5SOSki4-kzlbyVxyXHI",
  authDomain: "personalassistant-502c4.firebaseapp.com",
  databaseURL: "https://personalassistant-502c4.firebaseio.com",
  projectId: "personalassistant-502c4",
  storageBucket: "personalassistant-502c4.appspot.com",
  messagingSenderId: "1055743406556",
  appId: "1:1055743406556:web:1fa326244a2082e02a5f19"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

/*
const AppContainer = createAppContainer(
  createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  }
));

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
*/
export default createAppContainer(
  createSwitchNavigator(
   {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
  },{
    initialRouteName: "Loading"
  }
  )
);
/*Example of SQLite Database in React Native*/
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LoginWithOtp from './pages/LoginWithOtp';

const App = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: 'Dashboard',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  LoginWithOtp: {
    screen: LoginWithOtp,
    navigationOptions: {
      title: 'LoginWithOtp',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
});
export default createAppContainer(App);

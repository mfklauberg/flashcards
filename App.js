import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { StatusBar } from './components';
import { Deck, Card, Settings } from './screens';

const screensConfiguration = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const screens = {
  Deck,
  Card,
  Settings
};

const Tabs = createBottomTabNavigator(screens, screensConfiguration);

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar />
    <Tabs />
  </View>
);

export default App;

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}

const Settings = {
  screen: SettingsScreen,
  navigationOptions: {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-settings-outline" size={30} color={tintColor} />
    )
  }
};

export default Settings;

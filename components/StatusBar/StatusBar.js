import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';

export default (FlashcardsStatusBar = () => (
  <View style={{ height: Constants.statusBarHeight }}>
    <StatusBar />
  </View>
));

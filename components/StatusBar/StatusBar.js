import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';

import { yellow } from '../../utils/colors';

export default (FlashcardsStatusBar = () => (
  <View style={{ backgroundColor: yellow, height: Constants.statusBarHeight, }}>
    <StatusBar backgroundColor={yellow} translucent={true} />
  </View>
));

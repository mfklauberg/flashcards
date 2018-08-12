import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { StatusBar } from './components';

import {
  // DECK
  DeckListScreen as DeckList,
  DeckDetailScreen as DeckDetail,

  // CARD
  CardDetailScreen as CardDetail,

  //QUIZ
  QuizScreen as Quiz
} from './screens';

import { red, yellow, grey45 } from './utils/colors';

const DeckNavigator = createStackNavigator(
  {
    DeckList,
    DeckDetail,
    CardDetail,
    Quiz
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar />
    <DeckNavigator />
  </View>
);

export default App;

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from 'react-navigation';

import AddCardScreen from '../AddCardScreen/AddCardScreen';
import DeckListScreen from '../DeckListScreen/DeckListScreen';
import DeckDetailScreen from '../DeckDetailScreen/DeckDetailScreen';

const DeckNavigator = createStackNavigator({
  DeckList: DeckListScreen,
  DeckDetail: DeckDetailScreen,
  AddCard: AddCardScreen
});

const Deck = {
  screen: DeckNavigator,
  navigationOptions: {
    tabBarLabel: 'Decks',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-folder-outline" size={30} color={tintColor} />
    )
  }
};

export default Deck;

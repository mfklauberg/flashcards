import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from 'react-navigation';

import CardListScreen from '../CardListScreen/CardListScreen';
import CardDetailScreen from '../CardDetailScreen/CardDetailScreen';

const CardsNavigator = createStackNavigator({
  CardList: CardListScreen,
  CardDetail: CardDetailScreen
});

const Card = {
  screen: CardsNavigator,
  navigationOptions: {
    tabBarLabel: 'Cards',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-albums-outline" size={30} color={tintColor} />
    )
  }
};

export default Card;

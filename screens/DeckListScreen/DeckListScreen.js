import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Screen, Title, DeckList as DeckListComponent } from '../../components';

const NewDeckButton = withNavigation(({ navigation }) => (
  <Button
    title="new deck"
    onPress={() => navigation.navigate('DeckDetail', { creating: true })}
  />
));

const DeckListScreen = ({ navigation }) => (
  <Screen>
    <Title rightButton={<NewDeckButton />}>Decks</Title>
    <DeckListComponent
      onPress={(id) => navigation.navigate('DeckDetail', { id })}
    />
  </Screen>
);

const DeckList = {
  screen: DeckListScreen,
  navigationOptions: {
    header: null
  }
};

export default DeckList;

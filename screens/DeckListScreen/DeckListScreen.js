import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import { getDecks } from '../../utils/api';
import { grey45 } from '../../utils/colors';
import { subscribe } from '../../utils/events';
import { Screen, List, Title, ListItem } from '../../components';

const ItemTitle = styled.Text`
  fontSize: 18px;
`;

const ItemDescription = styled.Text`
  color: ${grey45};
`;

class DeckListScreen extends Component {
  state = {
    decks: []
  };

  componentDidMount() {
    this.fetchDecks();

    this.unsubscribe = subscribe('Deck', () => this.fetchDecks());
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  fetchDecks = () => {
    getDecks().then((decks = []) => {
      this.setState({ decks: [...decks] });
    });
  };

  renderDeck = ({ item: deck }) => {
    const { navigation } = this.props;
    const { id, title, cards = [] } = deck;
    const cardsText = cards.length === 1 ? 'card' : 'cards';

    return (
      <ListItem onPress={() => navigation.navigate('DeckDetail', { id })}>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>
          {cards.length} {cardsText}
        </ItemDescription>
      </ListItem>
    );
  };

  render() {
    const { decks } = this.state;
    const { navigation } = this.props;

    return (
      <Screen>
        <Title
          rightButton={
            <Button
              title="new deck"
              onPress={() =>
                navigation.navigate('DeckDetail', { creating: true })
              }
            />
          }
        >
          Decks
        </Title>
        <List
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={(item) => item.id}
        />
      </Screen>
    );
  }
}

const DeckList = {
  screen: DeckListScreen,
  navigationOptions: {
    header: null
  }
};

export default DeckList;

import React, { Component } from 'react';
import styled from 'styled-components';

import { ListItem } from '..';
import { getDecks } from '../../utils/api';
import { grey45 } from '../../utils/colors';
import { subscribe } from '../../utils/events';

const Text = styled.Text`
  fontSize: 22px;
`

const ItemTitle = styled.Text`
  fontSize: 22px;
`;

const ItemDescription = styled.Text`
  fontSize: 18px;
  color: ${grey45};
`;

class DeckList extends Component {
  state = {
    decks: []
  };

  componentDidMount() {
    this.fetchDecks();

    this.unsubscribe = subscribe('Deck', () => this.fetchDecks());
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  fetchDecks = () => {
    getDecks().then((decks = []) => this.setState({ decks: [...decks] }));
  };

  renderDeck = ({ item: deck }) => {
    const { onPress } = this.props;
    const { id, title, cards = [] } = deck;
    const cardsText = cards.length === 1 ? 'card' : 'cards';

    return (
      <ListItem onPress={() => onPress(id)}>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>
          {cards.length} {cardsText}
        </ItemDescription>
      </ListItem>
    );
  };

  render() {
    const { decks } = this.state;

    if (decks.length === 0) {
      return (
        <Text>You don't have any deck registered.</Text>
      );
    }

    return (
      <List
        data={decks}
        renderItem={this.renderDeck}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

export default DeckList;
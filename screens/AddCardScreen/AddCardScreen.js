import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import { getCards, updateDeck, getDeck } from '../../utils/api';
import { grey45 } from '../../utils/colors';
import {
  Screen,
  List,
  Title,
  BackButton,
  SelectListItem
} from '../../components';
import { notify } from '../../utils/events';

const ItemTitle = styled.Text`
  fontSize: 18px;
`;

const ItemDescription = styled.Text`
  color: ${grey45};
`;

class AddCardScreen extends Component {
  state = {
    deck: {},
    cards: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    getDeck(id).then((deck) => {
      this.setState({ deck });
    });

    this.fetchCards();
  }

  fetchCards = () => {
    getCards().then((cards = []) => {
      const { deck } = this.state;
      const { cards: deckCards } = deck;

      const mutatedCards = cards.map((card) => ({
        ...card,
        selected: deckCards.includes(card.id)
      }));

      this.setState({ cards: mutatedCards });
    });
  };

  saveCardsToDeck = () => {
    const { navigation } = this.props;
    const { deck, cards } = this.state;

    const selectedCards = cards
      .filter((card) => card.selected)
      .map((card) => card.id);

    const parameters = {
      ...deck,
      cards: selectedCards
    };

    updateDeck(deck.id, parameters).then(() => {
      notify('Deck');
      navigation.goBack();
    });
  };

  onCardPress = (id) => {
    const { cards } = this.state;
    const index = cards.findIndex((card) => card.id === id);
    const card = cards[index];

    const mudatedCards = [...cards];

    mudatedCards[index] = {
      ...card,
      selected: !card.selected
    };

    this.setState({ cards: mudatedCards });
  };

  renderCard = ({ item: card }) => {
    const { id, question, answer, selected } = card;

    return (
      <SelectListItem selected={selected} onPress={() => this.onCardPress(id)}>
        <ItemTitle>{question}</ItemTitle>
        <ItemDescription>{answer}</ItemDescription>
      </SelectListItem>
    );
  };

  render() {
    const { cards } = this.state;

    return (
      <Screen>
        <Title
          leftButton={<BackButton />}
          rightButton={
            <Button title="save" onPress={() => this.saveCardsToDeck()} />
          }
        >
          Cards
        </Title>
        <List
          data={cards}
          renderItem={this.renderCard}
          keyExtractor={(item) => item.id}
        />
      </Screen>
    );
  }
}

const AddCard = {
  screen: AddCardScreen,
  navigationOptions: {
    header: null
  }
};

export default AddCard;

import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import { getCards } from '../../utils/api';
import { subscribe } from '../../utils/events';
import { Screen, List, Title, ListItem } from '../../components';

const ItemTitle = styled.Text`
  fontSize: 18px;
`;

class CardListScreen extends Component {
  state = {
    cards: []
  };

  componentDidMount() {
    this.fetchCards();

    this.unsubscribe = subscribe('Card', () => this.fetchCards());
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  fetchCards = () => {
    getCards().then((cards = []) => {
      this.setState({ cards: [...cards] });
    });
  };

  renderCard = ({ item: card }) => {
    const { id, question } = card;
    const { navigation } = this.props;

    return (
      <ListItem onPress={() => navigation.navigate('CardDetail', { id })}>
        <ItemTitle>{question}</ItemTitle>
      </ListItem>
    );
  };

  render() {
    const { cards } = this.state;
    const { navigation } = this.props;

    return (
      <Screen>
        <Title
          rightButton={
            <Button
              title="new card"
              onPress={() =>
                navigation.navigate('CardDetail', { creating: true })
              }
            />
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

const CardList = {
  screen: CardListScreen,
  navigationOptions: {
    header: null
  }
};

export default CardList;

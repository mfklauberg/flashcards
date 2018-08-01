import React, { Component } from 'react';
import { Button, View, Alert } from 'react-native';

import { notify } from '../../utils/events';
import { getDeck, addDeck, updateDeck, removeDeck } from '../../utils/api';
import {
  BigButton,
  BackButton,
  Screen,
  Title,
  Input,
  Form
} from '../../components';

class DeckDetailScreen extends Component {
  state = {
    deck: {
      cards: [],
      title: ''
    },
    editing: false,
    creating: false
  };

  componentDidMount() {
    const { navigation } = this.props;

    const id = navigation.getParam('id');

    id && this.fetchDeck(id);
    this.setState({ creating: navigation.getParam('creating') });


  }

  toggleEditState = () =>
    this.setState((prevState) => ({ editing: !prevState.editing }));

  fetchDeck = (id) => {
    getDeck(id).then((deck) => {
      this.setState({ deck });
    });
  };

  saveDeck = () => {
    const { navigation } = this.props;
    const { deck, creating, editing } = this.state;

    if (creating) {
      return addDeck({ ...deck }).then(() => {
        notify('Deck');
        navigation.goBack();
      });
    }

    if (editing) {
      this.toggleEditState();

      return updateDeck(deck.id, { ...deck }).then(() => {
        notify('Deck');
      });
    }
  };

  deleteDeck = () => {
    const { deck } = this.state;
    const { navigation } = this.props;

    const remove = () => {
      removeDeck(deck.id).then(() => {
        notify('Deck');

        navigation.goBack();
      });
    };

    Alert.alert('Remove Deck', 'Are you sure?', [
      { text: 'Yes', onPress: () => remove() },
      { text: 'No', style: 'cancel' }
    ]);
  };

  renderTitle = () => {
    const { creating, editing, deck } = this.state;

    const text = creating ? 'Add deck' : deck.title;
    const button =
      creating || editing ? (
        <Button title="save" onPress={() => this.saveDeck()} />
      ) : (
        <Button title="edit" onPress={() => this.toggleEditState()} />
      );

    return (
      <Title leftButton={<BackButton />} rightButton={button}>
        {text}
      </Title>
    );
  };

  renderContent = () => {
    const { deck, creating, editing } = this.state;

    const editable = creating || editing;
    const onChange = (field) => (text) => (deck[field] = text);

    return (
      <Form>
        <Input
          label="Title"
          value={deck.title}
          editable={editable}
          onChangeText={onChange('title')}
        />
        {deck.id && (
          <Input
            label="Cards"
            editable={false}
            value={deck.cards.length.toString()}
          />
        )}
      </Form>
    );
  };

  renderButtons = () => {
    const { navigation } = this.props;
    const { deck, creating } = this.state;

    return (
      <View>
        {!creating && (
          <BigButton
            title="add/remove cards"
            onPress={() => navigation.navigate('AddCard', { id: deck.id })}
          />
        )}
        {!creating && (
          <BigButton title="remove deck" onPress={() => this.deleteDeck()} />
        )}
      </View>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderButtons()}
      </Screen>
    );
  }
}

const DeckList = {
  screen: DeckDetailScreen,
  navigationOptions: {
    header: null
  }
};

export default DeckList;

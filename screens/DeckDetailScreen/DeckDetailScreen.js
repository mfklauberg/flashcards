import React, { Component } from 'react';
import { Button, View, Alert } from 'react-native';

import { notify, subscribe } from '../../utils/events';
import { getDeck, addDeck, updateDeck, removeDeck } from '../../utils/api';
import {
  BackButton,
  Screen,
  Title,
  Input,
  Form,
  Actions
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

    this.setState({ creating: navigation.getParam('creating') });

    if (id) {
      id && this.fetchDeck(id);

      const eventName = `Deck_${id}`;
      this.unsubscribe = subscribe(eventName, () => this.fetchDeck(id));
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
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

    Alert.alert('REMOVE DECK', 'Are you sure?', [
      { text: 'Confirm', onPress: () => remove() },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  renderTitle = () => {
    const { creating, editing, deck } = this.state;

    const text = creating ? 'Add deck' : deck.title;

    const saveButton = <Button title="save" onPress={() => this.saveDeck()} />;
    const editButton = <Button title="edit" onPress={() => this.toggleEditState()} />;

    const rightButton = (creating || editing) ? saveButton : editButton;

    return (
      <Title leftButton={<BackButton />} rightButton={rightButton}>
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

    if (creating) {
      return null;
    }

    return (
      <Actions>
        <Button title="add card" onPress={() => navigation.navigate('CardDetail', { deck: deck.id })}/>
        <Button title="start quiz" onPress={() => navigation.navigate('Quiz', { deck: deck.id })}/>
        <Button title="remove deck" onPress={() => this.deleteDeck()} />
      </Actions>
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

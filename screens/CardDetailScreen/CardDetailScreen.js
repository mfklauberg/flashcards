import React, { Component } from 'react';
import { Button, View, Alert } from 'react-native';

import { notify } from '../../utils/events';
import { getCard, addCard, updateCard, removeCard } from '../../utils/api';
import { Screen, Form, Title, BackButton, BigButton } from '../../components';

class AddCardScreen extends Component {
  state = {
    card: {
      answer: '',
      question: ''
    },
    editing: false,
    creating: false
  };

  componentDidMount() {
    const { navigation } = this.props;

    const id = navigation.getParam('id');

    id && this.fetchCard(id);
    this.setState({ creating: navigation.getParam('creating') });
  }

  toggleEditState = () =>
    this.setState((prevState) => ({ editing: !prevState.editing }));

  fetchCard = (id) => {
    getCard(id).then((card) => this.setState({ card }));
  };

  saveCard = () => {
    const { navigation } = this.props;
    const { card, creating, editing } = this.state;

    const parameters = { ...card };

    if (creating) {
      return addCard(parameters).then(() => {
        notify('Card');
        navigation.goBack();
      });
    }

    if (editing) {
      this.toggleEditState();

      return updateCard(card.id, parameters).then(() => {
        notify('Card');
      });
    }
  };

  removeCard = () => {
    const { card } = this.state;
    const { navigation } = this.props;

    const remove = () => {
      removeCard(card.id).then(() => {
        notify('Card');
        notify('Deck');

        navigation.goBack();
      });
    };

    Alert.alert(
      'remove card',
      'By removing this card, it will also be removed from all decks which may contain it. Are you sure?',
      [
        { text: 'Yes', onPress: () => remove() },
        { text: 'No', style: 'cancel' }
      ]
    );
  };

  renderTitle = () => {
    const { card, creating, editing } = this.state;

    const text = creating ? 'Add card' : card.question;
    const button =
      creating || editing ? (
        <Button title="save" onPress={() => this.saveCard()} />
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
    const { card, creating, editing } = this.state;

    const editable = creating || editing;
    const onChange = (field) => (text) => (card[field] = text);

    return (
      <Form>
        <Input
          label="Question"
          editable={editable}
          value={card.question}
          onChangeText={onChange('question')}
        />
        <Input
          lines={3}
          label="Answer"
          multiline={true}
          editable={editable}
          value={card.answer}
          onChangeText={onChange('answer')}
        />
      </Form>
    );
  };

  renderButtons = () => {
    const { creating } = this.state;

    return (
      <View>
        {!creating && (
          <BigButton title="remove card" onPress={() => this.removeCard()} />
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

const AddCard = {
  screen: AddCardScreen,
  navigationOptions: {
    header: null
  }
};

export default AddCard;

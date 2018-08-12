import React, { Component } from 'react';
import { Button } from 'react-native';

import { notify } from '../../utils/events';
import { addCard } from '../../utils/api';
import { Screen, Form, Title, BackButton } from '../../components';

class AddCardScreen extends Component {
  state = {
    deck: '',
    card: {
      answer: '',
      question: ''
    },
  };

  componentDidMount() {
    const { navigation } = this.props;

    const deck = navigation.getParam('deck');
    this.setState({ deck });
  }

  saveCard = () => {
    const { card, deck } = this.state;
    const { navigation } = this.props;

    addCard(deck, { ...card }).then(() => {
      notify('Deck');
      notify(`Deck_${deck}`);
      navigation.goBack();
    });
  };

  renderTitle = () => {
    const backButton = <BackButton />;
    const saveButton = <Button title="save" onPress={() => this.saveCard()} />

    return (
      <Title leftButton={backButton} rightButton={saveButton}>
        Add Card
      </Title>
    );
  };

  renderContent = () => {
    const { card } = this.state;
    const onChange = (field) => (text) => (card[field] = text);

    return (
      <Form>
        <Input
          label="Question"
          value={card.question}
          onChangeText={onChange('question')}
        />
        <Input
          lines={3}
          label="Answer"
          multiline={true}
          value={card.answer}
          onChangeText={onChange('answer')}
        />
      </Form>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderTitle()}
        {this.renderContent()}
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

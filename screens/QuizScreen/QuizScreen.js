import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import { getDeck } from '../../utils/api';
import {
  Screen,
  Title,
  BackButton,
  Actions,
  Questionnaire
} from '../../components';

import {
  clearLocalNotifications,
  createLocalNotification
} from '../../utils/notifications';

const Instructions = styled.View`
  marginTop: 8px;
`;

const Text = styled.Text`
  padding: 4px;
  fontSize: 22px;
`;

const BoldText = Text.extend`
  fontWeight: bold;
`;

class QuizScreen extends Component {
  state = {
    deck: {},
    index: 0,
    results: [],
    started: false,
    finished: false
  };

  componentDidMount() {
    const { navigation } = this.props;
    const deck = navigation.getParam('deck');

    if (deck) {
      this.fetchDeck(deck);
    }
  }

  fetchDeck = (id) => {
    getDeck(id).then((deck) => {
      this.setState({ deck });
    });
  };

  startQuiz = () => {
    this.setState({ started: true, finished: false, results: [] });
  };

  onQuizEnd = (results) => {
    clearLocalNotifications().then(() => createLocalNotification());

    this.setState({
      finished: true,
      results
    });
  };

  renderResults = () => {
    const { deck, finished, results } = this.state;
    const { title, cards = [] } = deck;

    if (!finished) {
      return null;
    }

    const correctCards = results.filter((result) => result.correct);

    return (
      <Instructions>
        <Text>
          Here's your results for the <BoldText>{title}</BoldText> quiz.
        </Text>
        <Text>
          Out of <BoldText>{cards.length} questions</BoldText>, you got{' '}
          <BoldText>{correctCards.length} questions</BoldText> right!
        </Text>
      </Instructions>
    );
  };

  renderInstructions = () => {
    const { deck, started } = this.state;
    const { title, cards = [] } = deck;

    if (started) {
      return null;
    }

    return (
      <Instructions>
        <Text>
          You selected the <BoldText>{title}</BoldText> quiz.
        </Text>
        <Text>
          This quiz has <BoldText>{cards.length}</BoldText> question(s).
        </Text>
        <Text>
          When ready, press the <BoldText>START</BoldText> button.
        </Text>
      </Instructions>
    );
  };

  renderQuestion = () => {
    const { started, deck } = this.state;

    if (!started) {
      return null;
    }

    return (
      <Questionnaire
        questions={deck.cards}
        onFinish={(...args) => this.onQuizEnd(...args)}
      />
    );
  };

  renderContent = () => {
    const { started, finished } = this.state;

    if (finished) {
      return this.renderResults();
    }

    if (started) {
      return this.renderQuestion();
    }

    return this.renderInstructions();
  };

  renderButtons = () => {
    const { started, finished } = this.state;

    if (!started) {
      return (
        <Actions>
          <Button title="START" onPress={() => this.startQuiz()} />
        </Actions>
      );
    }

    if (finished) {
      return (
        <Actions>
          <Button title="RESTART" onPress={() => this.startQuiz()} />
        </Actions>
      );
    }

    return null;
  };

  render() {
    const leftButton = <BackButton />;

    return (
      <Screen>
        <Title leftButton={leftButton}>Quiz!</Title>
        {this.renderContent()}
        {this.renderButtons()}
      </Screen>
    );
  }
}

const Quiz = {
  screen: QuizScreen,
  navigationOptions: {
    header: null
  }
};

export default Quiz;

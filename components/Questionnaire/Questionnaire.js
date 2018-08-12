import React, { Component } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';

import { Actions, VerticalActions } from '..';
import { white, grey45, green, red, grey30 } from '../../utils/colors';

const Container = styled.View`
  flex: 1;
  justifyContent: center;
`;

const CardContainer = styled.View`
  padding: 4px;
  maxHeight: 90%;
  borderRadius: 4px;
  backgroundColor: ${white};
  boxShadow: 5px 5px 5px ${grey45};
`;

const CardHeader = styled.View`
  marginRight: 4px;
  marginBottom: 4px;
`;

const HeaderText = styled.Text`
  fontSize: 18px;
  color: ${grey30}
  textAlign: right;
`

const CardContent = styled.View`
  paddingBottom: 4px;
  justifyContent: center;
`

const ContentText = styled.Text`
  fontSize: 26px;
  textAlign: center;
`;

class Questionnaire extends Component {
  state = {
    index: 0,
    results: [],
    questions: [],
    finished: false,
    showingAnswer: false
  };

  onAnswer = (question, value) => {
    const { index, results } = this.state;
    const { onFinish, questions } = this.props;

    const result = {
      question,
      correct: value > 0
    };

    if (index + 1 === questions.length) {
      return onFinish([...results, result]);
    }

    this.setState((previousState) => ({
      showingAnswer: false,
      index: previousState.index + 1,
      finished: previousState.index === questions.length,
      results: [...previousState.results, result],
    }));
  };

  renderCard = () => {
    const { index, showingAnswer } = this.state;
    const { questions } = this.props;

    const card = questions[index];

    if (!card) {
      return null;
    }

    const cardText = showingAnswer ? card.answer : card.question;
    const headerText = `Question ${index + 1} of ${questions.length}`;

    return (
      <CardContainer>
        <CardHeader>
          <HeaderText>{headerText}</HeaderText>
        </CardHeader>
        <CardContent>
          <ContentText>{cardText}</ContentText>
        </CardContent>
      </CardContainer>
    )
  }

  renderButtons = () => {
    const { index, finished, showingAnswer } = this.state;

    if (finished) {
      return null;
    }

    if (!showingAnswer) {
      return (
        <Actions>
          <Button title="See answer" onPress={() => this.setState({ showingAnswer: true })} />
        </Actions>
      );
    }

    return (
      <Actions>
        <VerticalActions>
          <Button color={green} title="CORRECT" onPress={() => this.onAnswer(index, 1)} />
          <Button color={red} title="INCORRECT" onPress={() => this.onAnswer(index, -1)} />
        </VerticalActions>
      </Actions>
    );
  };

  render() {
    return (
      <Container>
        {this.renderCard()}
        {this.renderButtons()}
      </Container>
    );
  }
}

export default Questionnaire;

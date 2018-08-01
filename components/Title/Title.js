import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const TitleContainer = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
`;

const Container = styled.View`
  alignItems: center;
  flexDirection: row;
`;

const TitleText = styled.Text`
  fontSize: 32px;
  fontWeight: bold;
`;

export default (Title = ({ children, rightButton, leftButton }) => (
  <TitleContainer>
    <Container>
      {leftButton}
      <TitleText>{children}</TitleText>
    </Container>
    {rightButton}
  </TitleContainer>
));

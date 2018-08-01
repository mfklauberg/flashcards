import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  padding: 8px;
  backgroundColor: white;
`;

export default (Screen = ({ children }) => <Container>{children}</Container>);

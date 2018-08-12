import React from 'react';
import styled from 'styled-components';
import { yellow } from '../../utils/colors';

const Container = styled.View`
  flex: 1;
  padding: 8px;
  backgroundColor: ${yellow};
`;

export default (Screen = ({ children }) => <Container>{children}</Container>);

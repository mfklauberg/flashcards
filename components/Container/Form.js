import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  padding: 8px;
  marginTop: 16px;
`;

export default (Form = ({ children }) => <Container>{children}</Container>);

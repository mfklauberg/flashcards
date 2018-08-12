import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  marginTop: 8px;
  justifyContent: center;
`;

export default (Actions = ({ children }) => <Container>{children}</Container>);

import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
`;

export default (Actions = ({ children }) => <Container>{children}</Container>);

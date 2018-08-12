import React from 'react';
import styled from 'styled-components';
import { white, grey45 } from '../../utils/colors';

const Container = styled.View`
  padding: 8px;
  marginTop: 16px;
  borderRadius: 3px;
  backgroundColor: ${white};
  boxShadow: 5px 5px 5px ${grey45};
`;

export default (Form = ({ children }) => <Container>{children}</Container>);

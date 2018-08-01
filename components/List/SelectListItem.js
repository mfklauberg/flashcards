import React from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import RadioButton from '../Button/RadioButton';

const Container = styled.View``;

const StyledListItem = styled(ListItem)`
  alignItems: center;
  flexDirection: row;
  justifyContent: start;
`;

const SelectListItem = ({ children, selected, onPress }) => (
  <StyledListItem onPress={onPress}>
    <RadioButton selected={selected} />
    <Container>{children}</Container>
  </StyledListItem>
);

export default SelectListItem;

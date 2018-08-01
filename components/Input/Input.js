import React from 'react';
import styled from 'styled-components';
import { grey15, grey30, grey65 } from '../../utils/colors';

const Container = styled.View`
  marginBottom: 12px;
`;

const Text = styled.Text`
  color: ${(props) => (props.editable ? grey65 : grey30)};
`;

const TextInput = styled.TextInput`
  padding: 4px;
  fontSize: 16px;
  marginTop: 4px;
  borderBottomWidth: 1px;
  color: ${(props) => (props.editable ? grey65 : grey30)};
  borderColor: ${(props) => (props.editable ? grey30 : grey15)};
`;

export default (Input = ({ label, editable = true, ...rest }) => (
  <Container editable={editable}>
    <Text editable={editable}>{label}</Text>
    <TextInput {...rest} editable={editable} />
  </Container>
));

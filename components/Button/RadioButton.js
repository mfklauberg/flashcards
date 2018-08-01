import React from 'react';

import styled from 'styled-components';
import { grey45, blue, white } from '../../utils/colors';

const Button = styled.View`
  width: 24px;
  height: 24px;
  borderWidth: 1px;
  borderRadius: 50%;
  marginRight: 12px;
  alignItems: center;
  borderColor: ${grey45};
  justifyContent: space-evenly;
`;

const Selection = styled.View`
  width: 14px;
  height: 14px;
  borderRadius: 50%;
  backgroundColor: ${(props) => (props.selected ? blue : white)};
`;

export default (RadioButton = ({ selected }) => (
  <Button>
    <Selection selected={selected} />
  </Button>
));

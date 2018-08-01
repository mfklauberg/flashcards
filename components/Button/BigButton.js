import React from 'react';
import styled from 'styled-components';

import { grey30, grey65 } from '../../utils/colors';

const ButtonText = styled.Text`
  fontSize: 28px;
  color: ${grey65};
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 8px;
  borderWidth: 1px;
  marginBottom: 8px;
  borderRadius: 6px;
  alignItems: center;
  borderColor: ${grey30};
`;

export default (BigButtom = ({
  title,
  ...rest
}) => (
    <ButtonContainer {...rest}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  ));

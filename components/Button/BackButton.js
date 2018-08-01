import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { blue } from '../../utils/colors';

const IconContainer = styled.TouchableOpacity`
  width: 16px;
  height: 32px;
  marginRight: 8px;
  alignItems: center;
`;

const BackButton = ({ navigation }) => (
  <IconContainer onPress={() => navigation.goBack()}>
    <Ionicons style={{ lineHeight: 32 }} name="ios-arrow-back" size={24} color={blue} />
  </IconContainer>
);

export default withNavigation(BackButton);

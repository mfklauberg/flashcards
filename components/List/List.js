import React from 'react';
import styled from 'styled-components';

const StyledList = styled.FlatList`
  marginTop: 8px;
`;

export default (List = ({ ...props }) => <StyledList {...props} />);

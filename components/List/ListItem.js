import styled from 'styled-components';
import { white, grey45 } from '../../utils/colors';

const ListItem = styled.TouchableOpacity`
  margin: 8px;
  padding: 8px;
  borderRadius: 3px;
  backgroundColor: ${white};
  boxShadow: 5px 5px 5px ${grey45};
`;

export default ListItem;
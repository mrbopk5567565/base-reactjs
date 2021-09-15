import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import respondTo from 'utility/respondTo';

const CoverContainer: any = styled(Grid)`
  height: 100%;
  background-color: ${props => props.theme.bg};
  order: 2;
  ${respondTo('sm')`order: 1;`}
`;

export default CoverContainer;

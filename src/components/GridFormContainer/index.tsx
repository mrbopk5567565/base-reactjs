import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import respondTo from 'utility/respondTo';

const ForgotFormContainer: any = styled(Grid)`
  height: 100%;
  background-color: ${props => props.theme.bgContainer};
  order: 1;
  ${respondTo('sm')`order: 2;`}
`;

export default ForgotFormContainer;

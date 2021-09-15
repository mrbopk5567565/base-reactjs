import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.bgButton} !important;
  height: 46px;
  border-radius: 4px;
  color: white !important;
`;

export default SubmitButton;

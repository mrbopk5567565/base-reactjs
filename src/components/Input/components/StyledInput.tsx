import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

const StyledInput = styled(InputBase)`
  padding: 14px 44px 14px 14px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  & > input {
    padding: 0;
  }
`;

export default StyledInput;

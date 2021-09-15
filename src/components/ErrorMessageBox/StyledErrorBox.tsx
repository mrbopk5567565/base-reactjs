import styled from 'styled-components';

const StyledErrorBox = styled.div`
  padding: 16px;
  background-color: ${props => props.theme.bgError};
  border-radius: 4px;
  margin-bottom: 16px;
  .la-warning {
    margin-right: 6px;
    color: ${props => props.theme.textError};
    font-size: 25px;
    vertical-align: middle;
  }
`;

export default StyledErrorBox;

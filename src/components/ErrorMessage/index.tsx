import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: ${props => props.theme.textError};
  font-weight: 500;
  margin-bottom: 20px;
`;

export default ErrorMessage;

import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.theme.textLabel};
`;

export default Label;

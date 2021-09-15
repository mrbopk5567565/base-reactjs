import React from 'react';
import styled from 'styled-components';
import className from 'classnames';

const StyledIcon = styled.i`
  position: absolute;
  top: 4px;
  right: 2px;
  padding: 10px;
  cursor: pointer;
  font-size: 22px;
  color: ${props => props.theme.icon};
  transition: transform 0.3s ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

interface EyeIconProp {
  clickHandler: Function;
  isEyeClose: boolean;
}

const EyeIcon = React.memo((props: EyeIconProp) => (
  <StyledIcon
    className={className(
      'la',
      { 'la-eye': props.isEyeClose },
      { 'la-eye-slash': !props.isEyeClose }
    )}
    onClick={() => props.clickHandler()}
  />
));

export default EyeIcon;

import React from 'react';
import StyledErrorBox from './StyledErrorBox';
import { ReactHookFormError } from 'react-hook-form/dist/types';
import ErrorMessage from 'components/ErrorMessage';
interface ErrorMessageBoxProps {
  error: ReactHookFormError;
}

const ErrorMessageBox = React.memo((props: ErrorMessageBoxProps) => (
  <StyledErrorBox>
    <ErrorMessage>
      <i className="la la-warning" />
      {props.error && props.error.message}
    </ErrorMessage>
  </StyledErrorBox>
));

export default ErrorMessageBox;

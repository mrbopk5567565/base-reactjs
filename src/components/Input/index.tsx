import React, { lazy } from 'react';
import useToggle from 'hooks/useToggle';
import { ReactHookFormError } from 'react-hook-form/dist/types';
const StyledInput = lazy(() => import('./components/StyledInput'));
const InputContainer = lazy(() => import('./components/InputContainer'));
const EyeIcon = lazy(() => import('./components/EyeIcon'));
const WarningIcon = lazy(() => import('./components/WarningIcon'));
const Label = lazy(() => import('./components/Label'));
const Hint = lazy(() => import('./components/Hint'));

interface InputProps {
  label?: string;
  type: string;
  fullWidth?: boolean | undefined;
  placeholder?: string;
  value?: string;
  changeHandler?: Function;
  name: string;
  validate?: any;
  error?: ReactHookFormError;
  hint?: string;
}

const Input = React.memo((props: InputProps) => {
  let {
    label,
    type,
    fullWidth,
    placeholder,
    value,
    changeHandler,
    name,
    validate,
    error,
    hint,
  } = props;
  const [isShowPassword, toggle] = useToggle(false);
  const renderType = (type: string) => {
    switch (type) {
      case 'password':
        return isShowPassword ? 'text' : 'password';
      default:
        return 'text';
    }
  };
  return (
    <>
      <Label>{label}</Label>
      <InputContainer>
        <StyledInput
          name={name}
          type={renderType(type)}
          fullWidth={fullWidth}
          placeholder={placeholder}
          error={Boolean(error)}
          value={value}
          inputRef={validate}
          onChange={e => {
            if (typeof changeHandler !== 'function') return null;
            changeHandler(e.target.value);
          }}
        />
        {type === 'password' && (
          <EyeIcon clickHandler={toggle} isEyeClose={isShowPassword} />
        )}
        {type !== 'password' && Boolean(error) && <WarningIcon />}
        <Hint>{hint}</Hint>
      </InputContainer>
    </>
  );
});

export default Input;

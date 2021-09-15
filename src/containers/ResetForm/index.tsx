import React, { lazy } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';
import Input from 'components/Input';

const FormContainer = lazy(() => import('components/FormContainer'));
const SubmitButton = lazy(() => import('components/SubmitButton'));
const SubTitle = lazy(() => import('components/SubTitle'));

const SignInForm = React.memo(() => {
  return (
    <FormContainer>
      <h2>Reset your password</h2>

      <SubTitle>
        You have requested to reset the password for <b>name@work.com</b>
      </SubTitle>

      <form noValidate>
        <Input
          name="password"
          type="password"
          fullWidth
          placeholder="New Password"
          label="New Password"
        />

        <Input
          name="confirmPassword"
          type="password"
          fullWidth
          placeholder="Confirm Password"
          label="Confirm Password"
        />

        <ButtonGroup fullWidth>
          <SubmitButton variant="contained">RESET MY PASSWORD</SubmitButton>
        </ButtonGroup>

        <p style={{ textAlign: 'center' }}>
          Don’t have an account?
          <Link to="/">
            <b style={{ marginLeft: '5px' }}> Sign up here</b>
          </Link>
        </p>
      </form>
    </FormContainer>
  );
});

export default SignInForm;

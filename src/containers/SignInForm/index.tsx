import React, { lazy, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import webAuth from 'config/auth';
import useForm from 'react-hook-form';
import { ReactHookFormError } from 'react-hook-form/dist/types';
import { minUsername, minPassword } from 'config/formConst';
import { authAction } from 'redux/reducers/auth';

const FormContainer = lazy(() => import('components/FormContainer'));
const SubmitButton = lazy(() => import('components/SubmitButton'));
const Options = lazy(() => import('./components/Options'));
const Explanation = lazy(() => import('components/Explanation'));
const SubTitle = lazy(() => import('components/SubTitle'));
const Input = lazy(() => import('components/Input'));
const ErrorMessageBox = lazy(() => import('components/ErrorMessageBox'));
const ErrorMessage = lazy(() => import('components/ErrorMessage'));

const mapStateToProps = (state: any) => {
  return { isRemember: state.auth.isRemember };
};

type Props = ReturnType<typeof mapStateToProps> & {
  isRemember: boolean;
  dispatch: Dispatch;
};

const SignInForm: React.FC<Props> = React.memo(props => {
  const { isRemember, dispatch } = props;
  const { register, errors, setError, clearError, handleSubmit } = useForm();

  const login = (data: any, e: any) => {
    e.preventDefault();

    webAuth.login(
      {
        realm: 'Username-Password-Authentication',
        username: data.username,
        password: data.password,
      },
      (err: any, res: any) => {
        if (err) {
          console.log('err', err);
          switch (err.code) {
            case 'request_error':
              setError('auth', 'auth-deny', 'Please check your connection.');
              break;
            case 'access_denied':
              setError(
                'auth',
                'auth-deny',
                'Username or Password is incorrect. Please recheck and try again.'
              );
              break;

            default:
              break;
          }
        } else {
          console.log('res', res);
          clearError('auth');
        }
      }
    );
  };

  return (
    <FormContainer>
      <h2>Sign in</h2>

      <SubTitle>To start mananging your properties.</SubTitle>

      {errors.auth &&
        (errors.auth as ReactHookFormError).type === 'auth-deny' && (
          <ErrorMessageBox error={errors.auth as ReactHookFormError} />
        )}

      <form name="login" onSubmit={handleSubmit(login)}>
        <Input
          name="username"
          type="text"
          fullWidth
          placeholder="Enter your username"
          label="Username or email"
          validate={register({
            minLength: minUsername,
            required: true,
          })}
          error={errors.username as ReactHookFormError}
        />

        {errors.username &&
          (errors.username as ReactHookFormError).type === 'minLength' && (
            <ErrorMessage>
              Username must be at lease {minUsername} characters.
            </ErrorMessage>
          )}
        {errors.username &&
          (errors.username as ReactHookFormError).type === 'required' && (
            <ErrorMessage>Please enter your username.</ErrorMessage>
          )}

        <Input
          name="password"
          type="password"
          fullWidth
          placeholder="Enter your password"
          label="Password"
          validate={register({
            minLength: minPassword,
            required: true,
            // eslint-disable-next-line
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          })}
          error={errors.password as ReactHookFormError}
        />

        {errors.password &&
          (errors.password as ReactHookFormError).type === 'minLength' && (
            <ErrorMessage>
              Password must be at lease {minPassword} characters.
            </ErrorMessage>
          )}
        {errors.password &&
          (errors.password as ReactHookFormError).type === 'required' && (
            <ErrorMessage>Please enter your password.</ErrorMessage>
          )}
        {errors.password &&
          (errors.password as ReactHookFormError).type === 'pattern' && (
            <ErrorMessage>
              Password must be at least one uppercase letter, one lowercase
              letter and one number.
            </ErrorMessage>
          )}

        <Options container>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <label>
                <Explanation>
                  <Checkbox
                    checked={isRemember}
                    onChange={() =>
                      dispatch(authAction.setIsRemember(!isRemember))
                    }
                    value="isRemember"
                    color="primary"
                  />
                  Remember me
                </Explanation>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <Link to="/forgotpassword">
                <b>Forgot Password?</b>
              </Link>
            </Grid>
          </Grid>
        </Options>

        <ButtonGroup fullWidth>
          <SubmitButton type="submit" variant="contained">
            SIGN IN
          </SubmitButton>
        </ButtonGroup>

        <Explanation style={{ textAlign: 'center', marginTop: 25 }}>
          Don’t have an account?
          <Link to="/register">
            <b style={{ marginLeft: '5px' }}> Sign up here</b>
          </Link>
        </Explanation>
      </form>
    </FormContainer>
  );
});

export default connect(mapStateToProps)(SignInForm);

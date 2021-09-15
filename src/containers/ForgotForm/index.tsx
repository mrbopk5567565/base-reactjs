import React, { lazy } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';
import Input from 'components/Input';
import webAuth from 'config/auth';
import useForm from 'react-hook-form';
import { ReactHookFormError } from 'react-hook-form/dist/types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
const ErrorMessage = lazy(() => import('components/ErrorMessage'));
const FormContainer = lazy(() => import('components/FormContainer'));
const SubmitButton = lazy(() => import('components/SubmitButton'));
const SubTitle = lazy(() => import('components/SubTitle'));

const ForgotForm = React.memo(() => {
  const { register, errors, setError, clearError, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);
  const forgotPassword = (data: any, e: any) => {
    e.preventDefault();

    webAuth.changePassword(
      {
        connection: 'Username-Password-Authentication',
        email: data.email,
      },
      (err: object | null) => {
        if (err) {
          console.log('err', err);
        } else {
          setOpen(true);
        }
      }
    );
  };
  return (
    <FormContainer>
      <h2>Forgot password?</h2>

      <SubTitle>
        Don’t worry! Please enter your email address and we’ll email you with a
        link to reset your password.
      </SubTitle>

      <form name="forgotPassword" onSubmit={handleSubmit(forgotPassword)}>
        <Input
          name="email"
          type="email"
          fullWidth
          placeholder="name@work.com"
          label="Work Email"
          validate={register({
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            required: true,
          })}
          error={errors.email as ReactHookFormError}
        />
        {errors.email &&
          (errors.email as ReactHookFormError).type === 'required' && (
            <ErrorMessage>Please enter your email.</ErrorMessage>
          )}
        {errors.email &&
          (errors.email as ReactHookFormError).type === 'pattern' && (
            <ErrorMessage>
              Please enter your email address in format: yourname@work.com
            </ErrorMessage>
          )}

        <ButtonGroup fullWidth>
          <SubmitButton type="submit" variant="contained">
            SEND CONFIRMATION
          </SubmitButton>
        </ButtonGroup>

        <p style={{ textAlign: 'center' }}>
          Don’t have an account?
          <Link to="/">
            <b style={{ marginLeft: '5px' }}> Sign up here</b>
          </Link>
        </p>
      </form>

      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
            Email reset password is send.
          </div>
          <p>Please follow to reset your password.</p>
          <div style={{ textAlign: 'center', color: '#43a643', fontSize: 100 }}>
            <i className="la la-envelope"></i>
          </div>
        </DialogTitle>
        <ButtonGroup fullWidth>
          <SubmitButton variant="contained" onClick={() => setOpen(false)}>
            Close
          </SubmitButton>
        </ButtonGroup>
      </Dialog>
    </FormContainer>
  );
});

export default ForgotForm;

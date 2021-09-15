import React, { lazy } from 'react';
import webAuth from 'config/auth';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, Redirect } from 'react-router-dom';
import Input from 'components/Input';
import Checkbox from '@material-ui/core/Checkbox';
import useForm from 'react-hook-form';
import { ReactHookFormError } from 'react-hook-form/dist/types';
import { minUsername, minPassword } from 'config/formConst';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
const ErrorMessageBox = lazy(() => import('components/ErrorMessageBox'));
const FormContainer = lazy(() => import('components/FormContainer'));
const SubmitButton = lazy(() => import('components/SubmitButton'));
const SubTitle = lazy(() => import('components/SubTitle'));
const ErrorMessage = lazy(() => import('components/ErrorMessage'));

interface props {
  isAgreedPolicy: boolean;
  setIsAgreedPolicy: Function;
}

interface dataProps {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstname: string;
  lastname: string;
}

const RegisterForm = React.memo((props: any) => {
  const {
    register,
    errors,
    setError,
    clearError,
    handleSubmit,
    getValues,
  } = useForm();
  const [open, setOpen] = React.useState(false);
  let { isAgreedPolicy, setIsAgreedPolicy } = props;
  const signUp = (data: any, e: any) => {
    e.preventDefault();

    webAuth.signup(
      {
        connection: 'Username-Password-Authentication',
        // username: data.username,
        email: data.email,
        password: data.password,
        user_metadata: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
      },
      (err: any) => {
        if (err) {
          switch (err.code) {
            case 'invalid_signup':
              setError(
                'email',
                'duplicate',
                `${data.email} is already used. Please change your email.`
              );
              break;

            default:
              setError('auth', 'auth-deny', 'Please check your connection.');
              break;
          }
          console.log('err', err);
        } else {
          clearError('email');
          setOpen(true);
        }
      }
    );
  };
  return (
    <FormContainer>
      <h2>Register</h2>

      <SubTitle>
        Either you are a single juristic nor a property owner, get your company
        or property on the living os now.
      </SubTitle>
      {errors.auth &&
        (errors.auth as ReactHookFormError).type === 'auth-deny' && (
          <ErrorMessageBox error={errors.auth as ReactHookFormError} />
        )}
      <form name="signUp" onSubmit={handleSubmit(signUp)}>
        <Input
          name="firstname"
          type="text"
          fullWidth
          placeholder="Enter your first name"
          label="First name"
          validate={register({
            required: true,
          })}
          error={errors.firstname as ReactHookFormError}
        />
        {errors.firstname &&
          (errors.firstname as ReactHookFormError).type === 'required' && (
            <ErrorMessage>Please enter your firstname.</ErrorMessage>
          )}

        <Input
          name="lastname"
          type="text"
          fullWidth
          placeholder="Enter your last name"
          label="Last name"
          validate={register({
            required: true,
          })}
          error={errors.lastname as ReactHookFormError}
        />
        {errors.lastname &&
          (errors.lastname as ReactHookFormError).type === 'required' && (
            <ErrorMessage>Please enter your lastname.</ErrorMessage>
          )}
        {
          //   <Input
          //   name="username"
          //   type="text"
          //   fullWidth
          //   placeholder="Create your username"
          //   label="Username"
          //   validate={register({
          //     // minLength: minUsername,
          //     // required: true,
          //   })}
          //   error={errors.username as ReactHookFormError}
          // />
          // {errors.username &&
          //   (errors.username as ReactHookFormError).type === 'required' && (
          //     <ErrorMessage>Please enter your username.</ErrorMessage>
          //   )}
          // {errors.username &&
          //   (errors.username as ReactHookFormError).type === 'minLength' && (
          //     <ErrorMessage>
          //       Username must be at lease {minUsername} characters.
          //     </ErrorMessage>
          //   )}
        }

        <Input
          name="email"
          type="email"
          fullWidth
          placeholder="name@work.com"
          label="Work Email"
          changeHandler={() => {
            if (
              errors.email &&
              (errors.email as ReactHookFormError).type === 'duplicate'
            )
              clearError('email');
          }}
          validate={register({
            required: true,
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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
        {errors.email &&
          (errors.email as ReactHookFormError).type === 'duplicate' && (
            <ErrorMessage>
              {(errors.email as ReactHookFormError).message}
            </ErrorMessage>
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
          changeHandler={() => {
            if (getValues().password === getValues().confirmPassword) {
              clearError('confirmPassword');
            } else if (getValues().confirmPassword !== '') {
              setError('confirmPassword', 'validate');
            }
          }}
          error={errors.password as ReactHookFormError}
          hint={`Minimum ${minPassword} characters with a number and a letter. It’s case sensitive`}
        />
        {errors.password &&
          (errors.password as ReactHookFormError).type === 'required' && (
            <ErrorMessage>Please enter your password.</ErrorMessage>
          )}
        {errors.password &&
          (errors.password as ReactHookFormError).type === 'minLength' && (
            <ErrorMessage>
              Password must be at lease {minPassword} characters.
            </ErrorMessage>
          )}
        {errors.password &&
          (errors.password as ReactHookFormError).type === 'pattern' && (
            <ErrorMessage>
              Password must be at least one uppercase letter, one lowercase
              letter and one number.
            </ErrorMessage>
          )}

        <Input
          name="confirmPassword"
          type="password"
          fullWidth
          placeholder="Confirm your password"
          label="Confirm Password"
          validate={register({
            validate: (value: string) => getValues().password === value,
            required: true,
          })}
          error={errors.confirmPassword as ReactHookFormError}
        />
        {errors.confirmPassword &&
          (errors.confirmPassword as ReactHookFormError).type ===
            'required' && (
            <ErrorMessage>Please enter your confirm password.</ErrorMessage>
          )}

        {errors.confirmPassword &&
          (errors.confirmPassword as ReactHookFormError).type ===
            'validate' && (
            <ErrorMessage>The passwords you entered do not match.</ErrorMessage>
          )}

        <SubTitle>
          <label>
            <Checkbox
              checked={isAgreedPolicy}
              onChange={() => setIsAgreedPolicy(!isAgreedPolicy)}
              value="isAgreedPolicy"
              color="primary"
            />
            By signing up, you confirm that you’ve read and accepted our
            <b> User notice</b> and <b>Privacy Policy</b>.
          </label>
        </SubTitle>

        <ButtonGroup fullWidth>
          <SubmitButton
            disabled={!isAgreedPolicy}
            type="submit"
            variant="contained"
          >
            SIGN UP
          </SubmitButton>
        </ButtonGroup>

        <SubTitle style={{ textAlign: 'center' }}>
          Already have an account?
          <Link to="/">
            <b style={{ marginLeft: '5px' }}> Sign in here</b>
          </Link>
        </SubTitle>
      </form>
      <Dialog
        onClose={() => {
          setOpen(false);
          //redireact to login page
          props.push('/');
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          <div
            style={{
              fontSize: '1.5em',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Sign up is <span style={{ color: '#43a643' }}>success</span>.
          </div>
          <SubTitle>
            Verify email has been sent. Please check your email.
          </SubTitle>
          <div style={{ textAlign: 'center', color: '#43a643', fontSize: 100 }}>
            <i className="la la-calendar-check-o"></i>
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

export default connect(
  null,
  { push }
)(RegisterForm);

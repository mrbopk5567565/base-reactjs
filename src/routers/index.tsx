import React, { memo, lazy, Suspense } from 'react';
import GridFullHeight from 'components/GridFullHeight';
import { Route, Switch } from 'react-router-dom';
import loading from 'asset/img/loading.gif';
import { connect } from 'react-redux';
const SignIn = lazy(() => import('pages/SignIn'));
const Register = lazy(() => import('pages/Register'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const AuthResponse = lazy(() => import('pages/AuthResponse'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));

const Routes = (props: any) => (
  <Suspense
    fallback={
      <GridFullHeight
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <img src={loading} alt="loading" />
      </GridFullHeight>
    }
  >
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/reset" component={ResetPassword} />
      <Route path="/auth_response" component={AuthResponse} />
      <PrivateRoute
        path="/dashboard"
        component={Dashboard}
        authed={props.auth}
      />
      <Route exact path="/" component={SignIn} />
    </Switch>
  </Suspense>
);

const mapStateToProps = (state: any) => ({ auth: state.auth });

export default connect(mapStateToProps)(Routes);

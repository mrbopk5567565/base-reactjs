import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { authAction } from 'redux/reducers/auth';
import loading from 'asset/img/loading.gif';
import { Dispatch } from 'redux';
import { Redirect } from 'react-router';
import webAuth, { domain } from 'config/auth';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    location: state.router.location,
  };
};

type Props = ReturnType<typeof mapStateToProps> & {
  auth: object;
  location: object;
  dispatch: Dispatch;
};

const AuthResponse: React.FC<Props> = React.memo(props => {
  let { location, dispatch, auth } = props;
  const [isLoginSuccess, setIsLoginSuccess] = useState(true);

  const RedirectToDashboard = (auth: any) => {
    if (auth && auth.currentUser) {
      return <Redirect to="/dashboard" />;
    }
    return <img src={loading} alt="loading" />;
  };

  useEffect(() => {
    webAuth.parseHash({ hash: location.hash }, function(err, authResult) {
      if (err) {
        setIsLoginSuccess(false);
        return console.log(err);
      }

      if (authResult && authResult.accessToken) {
        dispatch(authAction.setToken(authResult.accessToken));
        setIsLoginSuccess(true);
        console.log('authResult', authResult);
        webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          console.log('user', user);
          dispatch(authAction.setCurrentUser(user));
          // Now you have the user's information
        });
        // webAuth.checkSession(
        //   {
        //     audience: `https://${domain}/api/v2/`,
        //     scope: 'read:current_user'
        //   }, function(err, result) {
        //      // use result.accessToken
        //      if (err) {
        //       return console.log(err);
        //      }
        //      console.log('result',result)
        //   }
        // );
      }
    });
  }, []);

  return isLoginSuccess ? RedirectToDashboard(auth) : <Redirect to="/" />;
});

export default connect(mapStateToProps)(AuthResponse);

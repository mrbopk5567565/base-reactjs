import React, { lazy, useEffect } from 'react';
import webAuth, { domain } from 'config/auth';
import { connect } from 'react-redux';
const SubmitButton = lazy(() => import('components/SubmitButton'));

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const UserInfo = React.memo((props: any) => {
  useEffect(() => {
    webAuth.checkSession(
      {
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user',
      },
      function(err, result) {
        // use result.accessToken
        if (err) {
          return console.log(err);
        }
        console.log('result', result);
      }
    );
  }, []);

  return (
    <div>
      <p>name: {props.auth.currentUser && props.auth.currentUser.email}</p>
      <SubmitButton type="button"> Log Out </SubmitButton>
    </div>
  );
});

export default connect(mapStateToProps)(UserInfo);

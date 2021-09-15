import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, authed, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      authed && authed.currentUser ? (
        React.createElement(component, props)
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
